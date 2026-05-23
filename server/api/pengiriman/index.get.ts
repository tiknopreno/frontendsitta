export default defineEventHandler(async (event) => {

    const db = await userServerDB()
    const query = getQuery(event)

    const queryUserId = String(query.userId || '').trim()

    const allPengiriman = db.tracking.getAll() || []
    const allPengguna = db.pengguna?.getAll() || []
    const allBahanAjar = db.bahanAjar.getAll() || []

    const filteredPengiriman = queryUserId
        ? allPengiriman.filter(p => String(p.idUser).trim() === queryUserId)
        : allPengiriman

    let joinData = filteredPengiriman.map(record => {

        const detailPengguna = allPengguna.find(u =>
            String(u.id || u.idUser).trim() === String(record.idUser).trim()
        )

        const detailBuku = allBahanAjar.find(b =>
            String(b.kodeLokasi || b.id || '').toLowerCase().trim() === String(record.paket || '').toLowerCase().trim()
        )


        const tglKirimRaw = record.tanggalKirim || '2025-08-25'
        const dateInstance = new Date(tglKirimRaw)
        dateInstance.setDate(dateInstance.getDate() + 5)
        const tanggalEstimasi = dateInstance.toISOString().split('T')[0]

        const logPerjalanan = record.perjalanan || []
        const statusTerupdate = logPerjalanan.length > 0
            ? logPerjalanan[logPerjalanan.length - 1].keterangan
            : (record.status || 'Diproses')

        const rawPrice = String(record.total || '0').replace(/[^0-9]/g, '')
        const cleanPrice = parseInt(rawPrice) || (detailBuku ? detailBuku.harga : 0) || 0

        return {
            id: record.id,
            invoice: record.nomorDO || record.id,
            title: detailBuku ? detailBuku.namaBarang : `Paket Modul ${record.paket}`,
            price: cleanPrice,
            kurir : record.ekspedisi,
            namaPengguna: detailPengguna ? detailPengguna.nama : 'Mahasiswa UT',
            lokasi: detailPengguna ? detailPengguna.lokasi : '-',
            tanggal: record.tanggalKirim || '2025-08-25',
            status: statusTerupdate,
            statusGlobal: record.status || 'Dalam Perjalanan',
            estimasi : tanggalEstimasi,
            perjalanan : logPerjalanan
        }
    })

    if (query.search) {
        const keyword = String(query.search).toLowerCase().trim()
        joinData = joinData.filter(b =>
            (b.title?.toLowerCase() || '').includes(keyword) ||
            (b.invoice?.toLowerCase() || '').includes(keyword) ||
            (b.namaPengguna?.toLowerCase() || '').includes(keyword)
        )
    }

    const totalData = joinData.length
    const page = Math.max(1, parseInt(String(query.page || 1)))
    const limit = Math.max(1, parseInt(String(query.limit || 4)))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = joinData.slice(startIndex, endIndex)

    return {
        success: paginatedData.length > 0,
        count: paginatedData.length,
        meta: {
            total: totalData,
            perPage: limit,
            currentPage: page,
            totalPages: Math.ceil(totalData / limit) || 1
        },
        data: paginatedData
    }

});