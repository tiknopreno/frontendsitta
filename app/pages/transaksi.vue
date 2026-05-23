<template>
  <div class="w-full py-4">

    <div class="flex items-center justify-between mb-6 px-1 max-w-7xl mx-auto">
      <div>
        <span class="text-[10px] font-bold text-indigo-600 tracking-widest uppercase block">Overview</span>
        <h2 class="text-xl font-black text-slate-950 tracking-tight">Riwayat Transaksi</h2>
      </div>

      <div v-if="isLoading"
        class="flex items-center gap-1.5 text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl animate-pulse">
        <svg class="animate-spin h-3.5 w-3.5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
        <span>Memuat transaksi...</span>
      </div>
    </div>

    <div class="mx-auto max-w-md md:max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

      <div class="md:col-span-1 space-y-4">
        <div class="text-white rounded-[24px] p-6 shadow-md shadow-indigo-600/5 space-y-4"
          style="background-color: #4f46e5;">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span class="text-sm font-medium text-white tracking-wide">Total Pembelian</span>
            </div>

            <span class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded uppercase tracking-wide text-white">
              IDR
            </span>
          </div>

          <div>
            <h1 class="text-2xl font-black tracking-tight font-mono text-white">
              Rp {{ totalPengeluaran.toLocaleString('id-ID') }}
            </h1>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <div class="bg-white/10 p-2.5 rounded-xl flex items-center justify-between">
              <span class="text-[10px] font-bold tracking-wider text-indigo-100">TOTAL ITEM</span>
              <span class="text-xs font-black text-white">{{ totalRecords }}</span>
            </div>
            <div class="bg-white/10 p-2.5 rounded-xl flex items-center justify-between">
              <span class="text-[10px] font-bold tracking-wider text-emerald-100">SUKSES</span>
              <span class="text-xs font-black text-emerald-300">{{ totalRecords }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-4">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Operations</h3>
        </div>

        <div v-if="riwayatTransaksi.length > 0" class="space-y-2.5">

          <div v-for="tx in riwayatTransaksi" :key="tx.id"
            class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-4 transition-all duration-200 hover:border-slate-200">

            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0 font-bold"
                :style="tx.status === 'Sukses' ? 'background-color: #f0fdf4; color: #16a34a;' : 'background-color: #fff1f2; color: #e11d48;'">

                <svg v-if="tx.status === 'Sukses'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div class="min-w-0 flex-1">
                <h4 class="text-xs font-bold text-slate-900 truncate tracking-tight">
                  {{ tx.title }}
                </h4>
                <p class="text-[10px] text-slate-400 font-medium mt-0.5">
                  {{ tx.tanggal }} • <span class="font-mono text-[9px] text-slate-500">{{ tx.invoice }}</span>
                </p>
              </div>
            </div>

            <div class="text-right flex-shrink-0 flex flex-col items-end justify-center gap-1 min-w-[110px]">
              <span class="text-xs font-extrabold text-slate-900 tracking-tight">
                - Rp {{ tx.price.toLocaleString('id-ID') }}
              </span>
              <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                :style="tx.status === 'Sukses' ? 'background-color: #e6f4ea; color: #137333;' : 'background-color: #fce8e6; color: #c5221f;'">
                {{ tx.status }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-slate-100 pt-4 w-full mt-4">
            <p class="text-[11px] text-slate-400 font-medium">
              Halaman <span class="font-bold text-slate-700">{{ currentPage }}</span> dari <span
                class="font-bold text-slate-700">{{ totalPages }}</span>
            </p>

            <div class="flex items-center gap-1.5">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="p-1.5 rounded-xl border border-slate-100 bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition duration-200 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="page === currentPage
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/10'
                : 'bg-white text-slate-600 border-slate-100 hover:bg-indigo-50'"
                class="w-7 h-7 rounded-xl text-[11px] font-bold border transition duration-200">
                {{ page }}
              </button>

              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="p-1.5 rounded-xl border border-slate-100 bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition duration-200 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        <div v-else-if="!isLoading"
          class="bg-white border border-slate-100 rounded-2xl p-8 text-center text-slate-400 text-xs shadow-sm">
          <p>Belum ada aktivitas riwayat transaksi.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const { user } = useAuth()

const globalSearch = useState('global-search-keyword', () => '')

const riwayatTransaksi = ref([])
const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const totalRecords = ref(0)
const totalAccumulatedPrice = ref(0)

const fetchTransaksi = async (page = 1) => {
  if (!user.value?.id) return

  isLoading.value = true
  try {
    const response = await $fetch('/api/transaksi', {
      method: 'GET',
      query: {
        userId: String(user.value.id),
        page: page,
        limit: 4,
        search: globalSearch.value
      }
    })

    if (response.success) {
      riwayatTransaksi.value = response.data
      currentPage.value = response.meta?.currentPage || 1
      totalPages.value = response.meta?.totalPages || 1
      totalRecords.value = response.meta?.total || 0
    } else {
      riwayatTransaksi.value = []
      totalPages.value = 1
      totalRecords.value = 0
    }
  } catch (error) {
    console.error('Gagal memuat histori transaksi:', error)
    riwayatTransaksi.value = []
  } finally {
    isLoading.value = false
  }
}

const fetchTotalPengeluaranAll = async () => {
  if (!user.value?.id) return
  try {
    const response = await $fetch('/api/transaksi', {
      method: 'GET',
      query: { userId: String(user.value.id), page: 1, limit: 100 }
    })
    if (response.success) {
      totalAccumulatedPrice.value = response.data
        .filter(t => t.status === 'Sukses')
        .reduce((sum, t) => sum + t.price, 0)
    }
  } catch (e) {
    console.error(e)
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchTransaksi(page)
  }
}

watch(globalSearch, () => {
  fetchTransaksi(1)
})

onMounted(() => {
  fetchTransaksi(currentPage.value)
  fetchTotalPengeluaranAll()
})

const totalPengeluaran = computed(() => totalAccumulatedPrice.value)
</script>