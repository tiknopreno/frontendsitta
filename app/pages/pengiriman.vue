<template>
  <div class="w-full py-4">

    <div class="flex items-center justify-between mb-6 px-1 max-w-7xl mx-auto">
      <div>
        <span class="text-[10px] font-bold text-indigo-600 tracking-widest uppercase block">Shipping Logistics</span>
        <h2 class="text-xl font-black text-slate-950 tracking-tight">Daftar Pengiriman</h2>
      </div>
    </div>

    <div class="mx-auto max-w-md md:max-w-7xl">
      <div v-if="daftarPengiriman.length > 0" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="ship in paginatedPengiriman" :key="ship.id"
            class="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition duration-200 group">
            <div>
              <div class="flex justify-between items-center mb-3">
                <span
                  class="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded uppercase tracking-wide">
                  {{ ship.kurir }}
                </span>
                <span class="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
                  :class="ship.status === 'Processing' || ship.status === 'In Transit' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'">
                  {{ ship.status }}
                </span>
              </div>

              <h4 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition truncate mb-1">
                {{ ship.title }}
              </h4>
              <p class="text-[11px] text-slate-400 font-mono">Resi: {{ ship.resi }}</p>
              <div class="mt-3 pt-3 border-t border-slate-50 space-y-2">

                <div class="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
                  <div class="w-4 flex justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-indigo-500" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span class="line-clamp-2">{{ ship.alamat }}</span>
                </div>

                <div class="flex items-center gap-2.5 text-[11px] font-bold text-slate-700">
                  <div class="w-4 flex justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-slate-400" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span>Penerima: {{ ship.namaMahasiswa || 'Test' }}</span>
                </div>

              </div>
            </div>

            <div class="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
              <div>
                <span class="text-[9px] text-slate-400 block font-bold">ESTIMASI TIBA</span>
                <span class="text-xs font-extrabold text-slate-800 font-mono">{{ ship.estimasi }}</span>
              </div>

              <NuxtLink :to="`/pengiriman-${ship.id}`"
                class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm shadow-indigo-600/10 flex items-center gap-1.5">
                <span>Lacak Paket</span>
                <span class="text-xs">→</span>
              </NuxtLink>
            </div>
          </div>
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
                : 'bg-white text-slate-600 border-slate-100 hover:bg-indigo-50'"
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
        class="bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>

        <h3 class="text-sm font-bold text-slate-900">Tidak ada pengiriman aktif</h3>
        <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
          Semua buku fisik cetak yang Anda beli akan muncul status pelacakan logistiknya di sini.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const { user } = useAuth()
const globalSearch = useState('global-search-keyword', () => '')

const daftarPengiriman = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(4)

const fetchDaftarPengiriman = async () => {
  if (!user.value?.id) return
  
  try {
    const response = await $fetch('/api/pengiriman', {
      method: 'GET',
      query: {
        userId: String(user.value.id),
        search: globalSearch.value
      }
    })

    if (response.success && response.data) {
      daftarPengiriman.value = response.data.map(item => {
      
        let statTerkini = "";
        if(item.statusGlobal === 'Dikirim'){
          statTerkini = "Delivered"
        }else{
            if(item.status.includes('Selesai')){
              statTerkini = 'Delivered';
            }else{
                statTerkini = 'In Transit';
            }
        }
        return {
          id: item.id,
          kurir: item.kurir ? 'JNE EXPRESS' : 'REGULER', 
          status: statTerkini, 
          title: item.title,
          resi: item.invoice || 'RES-00000',
          alamat: item.lokasi || 'Alamat Belum Diatur',
          namaMahasiswa: item.namaPengguna || 'Mahasiswa UT',
          estimasi: item.estimasi
        }
      })
    } else {
      daftarPengiriman.value = []
    }
  } catch (error) {
    console.error('Gagal mengambil data 3-join logistik:', error)
    daftarPengiriman.value = []
  }
}

const totalPages = computed(() => {
  return Math.ceil(daftarPengiriman.value.length / itemsPerPage.value) || 1
})

const paginatedPengiriman = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return daftarPengiriman.value.slice(startIndex, endIndex)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

watch(globalSearch, () => {
  currentPage.value = 1
  fetchDaftarPengiriman()
})

onMounted(() => {
  fetchDaftarPengiriman()
})
</script>