export default defineEventHandler(async (event) => {

    const db = await userServerDB();

    const query = getQuery(event);

    let listBahanAjar = db.bahanAjar.getAll();

    if (query.search) {
        const keyword = String(query.search).toLowerCase().trim()
        listBahanAjar = listBahanAjar.filter(b =>
            b.namaBarang.toLowerCase().includes(keyword) ||
            b.kodeBarang.toLowerCase().includes(keyword)
        )
    }

    const totalData = listBahanAjar.length;
    const page = Math.max(1, parseInt(String(query.page || 1)))
    const limit = Math.max(1, parseInt(String(query.limit || 4)))

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = listBahanAjar.slice(startIndex, endIndex)

    return {
        success: paginatedData.length > 0 ? true : false,
        count: listBahanAjar.length,
        meta : {
            total : totalData,
            perPage : limit,
            currentPage: page,
            totalPages : Math.ceil(totalData / limit)
        },
        data: paginatedData
    }

});