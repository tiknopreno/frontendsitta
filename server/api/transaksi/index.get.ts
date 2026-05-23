
export default defineEventHandler(async (event) => {
  const db = await userServerDB()
  const query = getQuery(event)
  
  const userId = String(query.userId || '').trim()
  if (!userId) {
    return { success: false, message: 'User ID wajib disertakan dalam parameter.' }
  }

  const allTransactions = db.transaksi.getAll()
  const allBahanAjar = db.bahanAjar.getAll()

  const myTransactions = allTransactions.filter(t => String(t.idUser).trim() === userId)

  let myJoinedBooks = myTransactions.map(record => {
    const detailBuku = allBahanAjar.find(b => String(b.id).trim() === String(record.idBahanAjar).trim())

    return {
      id: record.id,
      invoice: record.id || `TX-${Date.now()}`,
      title: detailBuku ? detailBuku.namaBarang : 'Modul Digital Terbuka (No-Name)', // fallback jika master null
      price: record.totalBayar || record.hargaSaatBeli || 0,
      tanggal: record.tanggalTransaksi || '2026-05-15 09:30:22',
      status: 'Sukses'
    }
  })

  if (query.search) {
    const keyword = String(query.search).toLowerCase().trim()
    myJoinedBooks = myJoinedBooks.filter(b => 
      (b.title?.toLowerCase() || '').includes(keyword) || 
      (b.invoice?.toLowerCase() || '').includes(keyword)
    )
  }

  const totalData = myJoinedBooks.length
  const page = Math.max(1, parseInt(String(query.page || 1)))
  const limit = Math.max(1, parseInt(String(query.limit || 4)))
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = myJoinedBooks.slice(startIndex, endIndex)

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
})