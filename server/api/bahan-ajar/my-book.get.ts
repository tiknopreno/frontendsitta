export default defineEventHandler(async (event) => {
  const db = await userServerDB()
  const query = getQuery(event)
  
  const userId = parseInt(String(query.userId || 0))
  if (!userId) {
    return { success: false, message: 'User ID tidak valid atau tidak menyertakan session.' }
  }

  const myOwnedRecords = db.progress.getByUserId(userId)
  const allBahanAjar = db.bahanAjar.getAll()

  let myJoinedBooks = myOwnedRecords.map(record => {
    const detailBuku = allBahanAjar.find(b => 
      b.kodeBarang.toLowerCase().includes(record.kodeBarang.toLowerCase()) ||
      record.kodeBarang.toLowerCase().includes(b.kodeBarang.toLowerCase())
    )

    return {
      ...detailBuku,
      idTransaksi: record.id,
      progress: record.progress
    }
  }).filter(book => book.namaBarang)

  if (query.search) {
    const keyword = String(query.search).toLowerCase().trim()
    myJoinedBooks = myJoinedBooks.filter(b => 
      b.namaBarang.toLowerCase().includes(keyword) || 
      b.kodeBarang.toLowerCase().includes(keyword)
    )
  }

  const totalData = myJoinedBooks.length

  const page = Math.max(1, parseInt(String(query.page || 1)))
  const limit = Math.max(1, parseInt(String(query.limit || 4)))
  
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedMyBooks = myJoinedBooks.slice(startIndex, endIndex)

  return {
    success: paginatedMyBooks.length > 0,
    count: paginatedMyBooks.length,
    meta: {
      total: totalData,
      perPage: limit,
      currentPage: page,
      totalPages: Math.ceil(totalData / limit)
    },
    data: paginatedMyBooks
  }
})