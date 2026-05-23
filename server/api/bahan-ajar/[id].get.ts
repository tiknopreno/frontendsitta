export default defineEventHandler(async (event) => {
  const db = await userServerDB()
  
  const paramId = getRouterParam(event, 'id')

  if (!paramId) {
    return { success: false, message: 'Parameter tidak ditemukan' }
  }

  const allBahanAjar = db.bahanAjar.getAll()

  const detailBuku = allBahanAjar.find(b => 
    b.id === paramId || 
    b.kodeBarang.toLowerCase() === paramId.toLowerCase()
  )

  if (!detailBuku) {
    return { success: false, message: 'Buku tidak ditemukan' }
  }

  return {
    success: true,
    data: detailBuku
  }
})