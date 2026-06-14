<script setup>

import { ref, onMounted, computed } from 'vue';

const { user, isLoggedIn, logout } = useAuth();


const isReady = ref(false)
onMounted(() => {
    isReady.value = true
});

const userInitials = computed(() => {
    if (!user.value?.nama) return 'US';
    return user.value.nama.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
});

const handleLogout = () => {
    logout();
}

const route = useRoute()
const searchPlaceholder = computed(() => {
  if (route.path === '/bahan-ajar') return 'Cari kode modul atau judul buku...'
  if (route.path === '/transaksi') return 'Cari ID transaksi atau nama buku...'
  if (route.path === '/pengiriman') return 'Cari nomor resi atau nama pemesan'
  return 'Cari kode modul atau judul buku...'
});

const globalSearch = useState('global-search-keyword', () => '');
</script>
<template>
    <div class="min-h-screen bg-[#F9FAFC] text-slate-800 font-sans antialiased pb-24 lg:pb-0 lg:pl-72">

        <header
            class="hidden lg:flex fixed top-0 right-0 left-72 h-20 bg-white border-b border-slate-100 px-10 items-center justify-between z-40">
            <div class="relative w-96">
                <span class="absolute inset-y-0 left-4 flex items-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input v-model="globalSearch" type="text" :placeholder="searchPlaceholder"
                    class="w-full pl-11 pr-4 py-2.5 bg-[#F5F7FA] border border-transparent rounded-2xl text-xs font-medium focus:outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300" />
            </div>

            <div class="flex items-center gap-6">

                <div v-if="isLoggedIn" class="flex items-center gap-6 animate-in fade-in duration-300">
                    <button
                        class="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span class="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                    </button>

                    <div
                        class="flex items-center gap-3 border-l pl-6 border-slate-100 group relative cursor-pointer py-2">
                        <div class="text-right">
                            <p class="text-xs font-bold text-slate-900">{{ user?.fullName || 'Pengguna' }}</p>
                            <p
                                class="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                {{ user?.userdetail?.role_user || 'Member' }}
                            </p>
                        </div>
                        <div
                            class="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-sm tracking-wider select-none transform group-hover:scale-105 transition-all duration-300">
                            {{ userInitials }}
                        </div>
                        <div
                            class="absolute right-0 top-14 bg-white border border-slate-100 rounded-xl p-1.5 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-50 w-32">
                            <button @click="handleLogout"
                                class="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-[11px] font-bold flex items-center gap-2 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Keluar</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="flex items-center pl-6 border-l border-slate-100 animate-in fade-in duration-300">
                    <NuxtLink to="/login"
                        class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition duration-200 shadow-md shadow-indigo-600/10 flex items-center gap-2 group">
                        <span>Masuk Akun</span>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M11 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </NuxtLink>
                </div>

            </div>
        </header>

        <nav
            class="fixed bottom-0 left-0 right-0 lg:top-0 lg:right-auto lg:w-72 bg-white border-t lg:border-t-0 lg:border-r border-slate-100 z-50 flex lg:flex-col justify-around lg:justify-start p-3 lg:p-8 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] lg:shadow-none">
            <div class="hidden lg:flex items-center mb-10 px-2">
                <NuxtLink to="/" class="flex items-center gap-3.5 group select-none cursor-pointer">
                    <div
                        class="w-10 h-10 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/10 border-2 border-white/10 transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                        <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
                            class="text-white">
                            <path d="M25 65C25 73.2843 31.7157 80 40 80H60C68.2843 80 75 73.2843 75 65V50"
                                stroke="currentColor" stroke-width="12" stroke-linecap="round" />
                            <path d="M75 35C75 26.7157 68.2843 20 60 20H40C31.7157 20 25 26.7157 25 35V50"
                                stroke="currentColor" stroke-width="12" stroke-linecap="round" />
                            <circle cx="50" cy="50" r="10" fill="white" />
                        </svg>
                    </div>
                    <div class="flex flex-col justify-center -space-y-1">
                        <h1 class="text-lg font-black text-slate-950 tracking-tight">SITTA</h1>
                        <span
                            class="text-[11px] text-indigo-600 font-extrabold tracking-wider uppercase group-hover:text-purple-600 transition-colors">Bahan
                            Ajar Digital</span>
                    </div>
                </NuxtLink>
            </div>

            <div class="flex lg:flex-col w-full justify-around lg:justify-start gap-1 lg:gap-2">
                <NuxtLink to="/"
                    class="flex flex-col lg:flex-row items-center gap-2 lg:gap-3.5 px-4 py-2.5 lg:w-full rounded-2xl text-slate-400 lg:text-slate-500 hover:text-indigo-600 lg:hover:bg-indigo-50/50 transition-all duration-300 group"
                    active-class="text-indigo-600 lg:bg-indigo-50 lg:text-indigo-700 font-bold shadow-sm shadow-indigo-50/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:scale-105"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide">My Books</span>
                </NuxtLink>

                <NuxtLink to="/bahan-ajar"
                    class="flex flex-col lg:flex-row items-center gap-2 lg:gap-3.5 px-4 py-2.5 lg:w-full rounded-2xl text-slate-400 lg:text-slate-500 hover:text-indigo-600 lg:hover:bg-indigo-50/50 transition-all duration-300 group"
                    active-class="text-indigo-600 lg:bg-indigo-50 lg:text-indigo-700 font-bold shadow-sm shadow-indigo-50/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:scale-105"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4 1.253" />
                    </svg>
                    <span class="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide">Bahan Ajar</span>
                </NuxtLink>

                <NuxtLink to="/transaksi"
                    class="flex flex-col lg:flex-row items-center gap-2 lg:gap-3.5 px-4 py-2.5 lg:w-full rounded-2xl text-slate-400 lg:text-slate-500 hover:text-indigo-600 lg:hover:bg-indigo-50/50 transition-all duration-300 group"
                    active-class="text-indigo-600 lg:bg-indigo-50 lg:text-indigo-700 font-bold shadow-sm shadow-indigo-50/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:scale-105"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span class="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide">Transaksi</span>
                </NuxtLink>

                <NuxtLink to="/pengiriman"
                    class="flex flex-col lg:flex-row items-center gap-2 lg:gap-3.5 px-4 py-2.5 lg:w-full rounded-2xl text-slate-400 lg:text-slate-500 hover:text-indigo-600 lg:hover:bg-indigo-50/50 transition-all duration-300 group"
                    active-class="text-indigo-600 lg:bg-indigo-50 lg:text-indigo-700 font-bold shadow-sm shadow-indigo-50/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform group-hover:scale-105"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 8h7l3 4v4h-3m-10 0h4" />
                    </svg>
                    <span class="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide">Pengiriman</span>
                </NuxtLink>
            </div>
        </nav>

        <main class="w-full min-h-[calc(100vh-5rem)] p-4 sm:p-8 lg:pt-28 lg:px-12 flex flex-col items-center">
            <div class="w-full max-w-5xl">
                <slot />
            </div>
        </main>
    </div>
</template>