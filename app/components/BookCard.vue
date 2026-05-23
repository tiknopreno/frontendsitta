<template>
  <div
    class="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.012)] overflow-hidden flex flex-col sm:flex-row p-5 gap-5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300 group">

    <div class="w-full h-48 sm:w-32 sm:h-44 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 relative shadow-sm">
      <img :src="book.cover" :alt="book.namaBarang"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>

    <div class="flex flex-col justify-between flex-1 min-w-0">
      <div>
        <div class="flex items-center justify-between gap-2">
          <span
            class="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">{{
              book.kodeBarang }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4 1.253" />
          </svg>
        </div>

        <h3
          class="text-base font-extrabold text-slate-900 mt-2 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
          {{ book.namaBarang }}
        </h3>
        <p class="text-xs text-slate-400 font-medium mt-0.5">{{ book.jenisBarang }}</p>
        <p class="text-xs text-slate-400 font-normal mt-2 line-clamp-2 leading-relaxed">{{ book.deskripsi }}</p>
      </div>

      <div v-if="isPurchased" class="mt-4">
        <div class="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5 tracking-wide">
          <span>PROGRESS MEMBACA</span>
          <span class="text-slate-800 font-extrabold">{{ book.progress }}%</span>
        </div>
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-700"
            :style="{ width: book.progress + '%' }"></div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center">
        <span v-if="!isPurchased" class="text-base font-black text-slate-900">
          Rp {{ book.harga.toLocaleString('id-ID') }}
        </span>
        <span v-else class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
          Owned
        </span>

        <NuxtLink :to="`/detail-${book.kodeBarang}?purchased=${isPurchased}&progress=${book.progress || 0}`"
          class="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-sm">
          Read More 
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  book: Object,
  isPurchased: {
    type: Boolean,
    default: false
  }
})
</script>