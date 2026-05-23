<template>
  <div class="w-full py-4" v-if="shipment">
    
    <div class="flex items-center justify-between mb-6 px-1 max-w-7xl mx-auto">
      <div class="flex items-center gap-3">
        <button @click="$router.back()" class="w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center text-xs font-bold hover:bg-slate-50 transition shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span class="text-[10px] font-bold text-indigo-600 tracking-widest uppercase block">Tracking Details</span>
          <h2 class="text-xl font-black text-slate-950 tracking-tight">Detail Pelacakan</h2>
        </div>
      </div>
      <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    </div>

    <div class="mx-auto max-w-md md:max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      
      <div class="md:col-span-1 space-y-4">
        <div class="text-white rounded-[24px] p-6 shadow-md shadow-indigo-600/5 space-y-4" style="background-color: #4f46e5;">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="text-xs font-medium text-indigo-100 tracking-wide">Resi Pengiriman</span>
            </div>
            <span class="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded uppercase tracking-wide font-mono">
              {{ shipment.kurir }}
            </span>
          </div>

          <div>
            <span class="text-[10px] text-indigo-200 block uppercase tracking-wider">No. Resi</span>
            <h1 class="text-xl font-black tracking-tight font-mono text-white mt-0.5">
              {{ shipment.resi }}
            </h1>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
            <div>
              <span class="text-[9px] font-bold text-indigo-200 tracking-wider block">ESTIMASI</span>
              <span class="text-xs font-black text-white mt-0.5 block font-mono">{{ shipment.estimasi }}</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-indigo-200 tracking-wider block">STATUS</span>
              <span class="text-[10px] font-black bg-white/20 px-1.5 py-0.5 rounded text-white mt-0.5 inline-block uppercase tracking-wide font-mono">
                {{ shipment.status }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2">
          
          <div class="flex items-center gap-1.5 text-slate-400">
            <div class="w-4 flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 class="text-xs font-bold uppercase tracking-wider">Alamat Tujuan</h4>
          </div>

          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <div class="w-4 flex justify-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span>{{ shipment.penerima }}</span>
          </div>

          <p class="text-[11px] text-slate-500 leading-relaxed pl-5.5">
            {{ shipment.alamat }}
          </p>
        </div>
      </div>

      <div class="md:col-span-2 space-y-3">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tracking History</h3>
          <span class="text-xs font-bold text-indigo-600 font-mono text-[10px] uppercase tracking-wider">Latest Update</span>
        </div>

        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
          
          <div class="absolute left-[33px] top-10 bottom-10 w-0.5 bg-slate-100"></div>

          <div class="space-y-6 relative">
            <div 
              v-for="(log, index) in trackingLogs" 
              :key="index" 
              class="flex items-start gap-4"
            >
              <div class="relative z-10 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5">
                <div 
                  class="w-2.5 h-2.5 rounded-full"
                  :class="index === 0 ? 'bg-indigo-600 ring-4 ring-indigo-100' : 'bg-slate-300'"
                ></div>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 
                    class="text-xs font-bold tracking-tight"
                    :class="index === 0 ? 'text-indigo-600' : 'text-slate-800'"
                  >
                    {{ log.status }}
                  </h4>
                  <span class="text-[10px] text-slate-400 font-mono">
                    {{ log.waktu }}
                  </span>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {{ log.deskripsi }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <div v-else class="text-center py-16 text-slate-400 text-xs animate-pulse flex flex-col items-center justify-center gap-2">
    <svg class="animate-spin h-5 w-5 text-indigo-600 mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Menghubungkan ke satelit logistik...</span>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const { user } = useAuth()

const globalSearch = useState('global-search-keyword', () => '')

const shipment = ref(null)
const trackingLogs = ref([])

const fetchTrackingDetails = async () => {
  if (!user.value?.id) return

  try {
    const response = await $fetch('/api/pengiriman', {
      method: 'GET',
      query: { userId: String(user.value.id) }
    })

    if (response.success && response.data) {
      const targetData = response.data.find(s => String(s.id).trim() === String(route.params.id).trim())

      if (targetData) {
        const tglKirim = targetData.tanggal || '2025-08-25'
        const date = new Date(tglKirim)
        date.setDate(date.getDate() + 5)
        const formattedEstimasi = date.toISOString().split('T')[0]

        let statBadge = 'IN TRANSIT'
        if (targetData.statusGlobal === 'Dikirim' || targetData.status?.includes('Selesai')) {
          statBadge = 'DELIVERED'
        }

        shipment.value = {
          id: targetData.id,
          kurir: targetData.kurir || 'JNE EXPRESS',
          resi: targetData.invoice || 'RES-00000',
          estimasi: targetData.estimasi || formattedEstimasi,
          status: statBadge,
          penerima: targetData.namaPengguna || 'Mahasiswa UT',
          alamat: targetData.lokasi || 'Alamat tujuan belum tercatat'
        }

        if (targetData.perjalanan && targetData.perjalanan.length > 0) {
          trackingLogs.value = targetData.perjalanan.map(log => {
            return {
              status: log.keterangan || 'Update Status',
              waktu: log.waktu || 'Hari ini',
              deskripsi: `Paket saat ini tercatat berada pada posisi: ${log.keterangan}`
            }
          })
        } else {
          trackingLogs.value = [
            {
              status: `Paket ${shipment.value.status}`,
              waktu: 'Hari ini, 10:00 WIB',
              deskripsi: `Paket dalam penanganan kurir logistik ${shipment.value.kurir}.`
            },
            {
              status: 'Paket Siap Dikirim',
              waktu: 'Kemarin, 14:20 WIB',
              deskripsi: 'Paket telah selesai disortir dan siap diberangkatkan dari Hub Jakarta.'
            }
          ]
        }
      }
    }
  } catch (error) {
    console.error('Gagal memuat history tracking pengiriman:', error)
  }
}

watch(globalSearch, (newKeyword) => {
  if (newKeyword.trim() !== '') {
    showToast('Tidak bisa search pada halaman detail', 'error')
  }
})

onMounted(() => {
  fetchTrackingDetails()
})
</script>