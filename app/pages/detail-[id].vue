<template>
  <div class="w-full py-4" v-if="book">

    <div class="flex items-center gap-3 mb-8 max-w-5xl mx-auto">
      <button @click="$router.back()"
        class="w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition shadow-sm">
        ←
      </button>
      <div>
        <span class="text-[10px] font-bold text-indigo-600 tracking-widest uppercase block">Book Information</span>
        <h2 class="text-xl font-black text-slate-950 tracking-tight">Detail Buku</h2>
      </div>
    </div>

    <div
      class="mx-auto max-w-5xl bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.012)] grid grid-cols-1 md:grid-cols-3 gap-8">

      <div class="md:col-span-1 flex justify-center">
        <div class="w-48 h-64 md:w-full md:h-80 rounded-2xl overflow-hidden shadow-md bg-slate-50">
          <img :src="book.cover" :alt="book.namaBarang" class="w-full h-full object-cover" />
        </div>
      </div>

      <div class="md:col-span-2 flex flex-col justify-between space-y-6">
        <div>
          <span
            class="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
            {{ book.jenisBarang }}
          </span>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight mt-3">{{ book.namaBarang }}</h1>
          <p class="text-sm font-semibold text-slate-400 mt-1">Edisi Ke-{{ book.edisi }}</p>

          <div class="mt-5 pt-4 border-t border-slate-100">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Synopsis</h4>
            <p class="text-sm text-slate-600 leading-relaxed font-normal">{{ book.deskripsi }}</p>
          </div>
        </div>

        <div class="pt-5 border-t border-slate-100 space-y-4">
          
          <div v-if="isPurchased" class="bg-slate-50/60 border border-slate-100 rounded-2xl p-4">
            <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-2 tracking-wide">
              <span>PROGRESS MEMBACA ANDA</span>
              <span class="text-indigo-600 font-extrabold text-xs">{{ readingProgress }}%</span>
            </div>
            <div class="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-1000"
                :style="{ width: readingProgress + '%' }"></div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Status Hak Akses</span>
              <span :class="isPurchased ? 'text-indigo-600' : 'text-amber-600'" class="text-sm font-extrabold">
                {{ isPurchased ? 'Sudah Terbuka (Full Access)' : 'Akses Terkunci' }}
              </span>
            </div>

            <button v-if="isPurchased"
              class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-600/20 transition duration-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4 1.253" />
              </svg>
              <span>Baca Sekarang</span>
            </button>

            <div v-else class="flex items-center gap-4">
              <span class="text-lg font-black text-slate-900">
                Rp {{ book.harga.toLocaleString('id-ID') }}
              </span>

              <button
                class="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition duration-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Beli Sekarang</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { showToast } = useToast()

const globalSearch = useState('global-search-keyword', () => '')

const book = ref(null)
const isLoading = ref(true)

const bookId = route.params.id 

const fetchDetailBuku = async () => {
  isLoading.value = true
  try {
    const response = await $fetch(`/api/bahan-ajar/${bookId}`, {
      method: 'GET'
    })

    if (response.success) {
      book.value = response.data
    }
  } catch (error) {
    console.error('Gagal memuat detail bahan ajar:', error)
  } finally {
    isLoading.value = false
  }
}

const isPurchased = computed(() => {
  return String(route.query.purchased).toLowerCase() === 'true'
})

const readingProgress = computed(() => {
  return parseInt(String(route.query.progress || 0))
})

watch(globalSearch, (newKeyword) => {
  if (newKeyword.trim() !== '') {
    showToast('Tidak bisa search pada halaman detail', 'error')
  }
})

onMounted(() => {
  fetchDetailBuku()
})
</script>