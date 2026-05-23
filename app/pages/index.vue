<script setup>
import { ref, watch, onMounted } from 'vue'

const { user } = useAuth()


const globalSearch = useState('global-search-keyword', () => '')

const myBooks = ref([])
const isSearching = ref(false) 
const currentPage = ref(1)
const totalPages = ref(1)

const fetchMyBooks = async (page = 1) => {
  if (!user.value?.id) return
  
  isSearching.value = true
  try {
    const response = await $fetch('/api/bahan-ajar/my-book', { 
      method: 'GET',
      query: { 
        userId: user.value.id,
        page: page,
        limit: 4,
        search: globalSearch.value
      }
    })
    
    if (response.success) {
      myBooks.value = response.data
      totalPages.value = response.meta?.totalPages || 1
      currentPage.value = response.meta?.currentPage || 1
    } else {
      myBooks.value = []
      totalPages.value = 1
    }
  } catch (error) {
    console.error('Gagal memuat koleksi buku saya:', error)
  } finally {
    isSearching.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchMyBooks(page)
  }
}

watch(globalSearch, (newKeyword) => {
  fetchMyBooks(1)
})

onMounted(() => {
  fetchMyBooks(currentPage.value)
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
      <div>
        <h2 class="text-xl font-black text-slate-900 tracking-tight">My Books</h2>
        <p class="text-xs text-slate-400 font-medium">Lanjutkan membaca berkas digital bahan ajar Anda</p>
      </div>

      <div v-if="isSearching"
        class="flex items-center gap-1.5 text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl animate-pulse">
        <svg class="animate-spin h-3.5 w-3.5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Menyaring modul...</span>
      </div>
    </div>

    <div v-if="myBooks.length > 0" class="space-y-6 w-full mt-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <ClientOnly>
          <BookCard 
            v-for="b in myBooks" 
            :key="b.idTransaksi" 
            :book="b" 
            :is-purchased="true" 
          />
        </ClientOnly>
      </div>

      <div class="flex items-center justify-between border-t border-slate-100 pt-5 w-full">
        <p class="text-xs text-slate-400 font-medium">
          Halaman <span class="font-bold text-slate-700">{{ currentPage }}</span> dari <span class="font-bold text-slate-700">{{ totalPages }}</span>
        </p>

        <div class="flex items-center gap-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
            class="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button v-for="page in totalPages" :key="page" @click="changePage(page)"
            :class="page === currentPage
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
              : 'bg-white text-slate-600 border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100'"
            class="w-8 h-8 rounded-xl text-xs font-bold border transition-all duration-200">
            {{ page }}
          </button>

          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
            class="p-2 rounded-xl border border-slate-100 bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </div>

    <div v-else
      class="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 p-6 flex flex-col items-center justify-center mt-6">
      <div class="p-3 bg-slate-50 rounded-full text-slate-400 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4 1.253" />
        </svg>
      </div>
      <p class="text-xs font-bold text-slate-800 mb-0.5">Belum Ada Koleksi Buku</p>
      <p class="text-[11px] text-slate-400 max-w-xs mb-4">
        Anda belum mengambil atau memiliki modul digital apa pun di semester ini.
      </p>
      <NuxtLink to="/bahan-ajar" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition duration-200 shadow-md shadow-indigo-600/10">
        Buka Katalog Berkas
      </NuxtLink>
    </div>
  </div>
</template>