<template>
    <div
        class="fixed inset-0 z-[100] bg-[#F9FAFC] flex min-h-screen w-full overflow-hidden text-slate-800 font-sans antialiased">

        <div class="w-full lg:w-[45%] flex flex-col justify-between p-6 sm:p-10 bg-white z-10 shadow-xl lg:shadow-none">

            <NuxtLink to="/" class="flex items-center gap-2.5 group select-none">
                    <div
                        class="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                        S
                    </div>
                    <h1
                        class="text-lg font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                        SITTA <span class="text-indigo-600 font-normal text-xs group-hover:text-indigo-500">Books</span>
                    </h1>
                </NuxtLink>

            <div class="w-full max-w-sm mx-auto space-y-6 my-auto pt-8 pb-12">
                <div class="space-y-1.5">
                    <h2 class="text-2xl font-black text-slate-950 tracking-tight">Selamat Datang</h2>
                    <p class="text-xs text-slate-400 font-medium">Silakan masuk untuk mengakses berkas digital & bahan
                        ajar Anda.</p>
                </div>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="space-y-1.5">
                        <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">NIM/Email
                        </label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <input v-model="loginForm.nimOrEmail" type="text" required placeholder="Masukkan nim/email"
                                class="w-full pl-11 pr-4 py-3 bg-[#F5F7FA] border border-transparent rounded-2xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300" />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <div class="flex justify-between items-center">
                            <label
                                class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Password</label>
                            <button type="button" @click="showForgotPasswordModal = true"
                                class="text-[10px] font-bold text-indigo-600 hover:underline focus:outline-none">Lupa
                                Password?</button>
                        </div>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>
                            <input v-model="loginForm.password" type="password" required placeholder="••••••••"
                                class="w-full pl-11 pr-4 py-3 bg-[#F5F7FA] border border-transparent rounded-2xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 transition-all duration-300" />
                        </div>
                    </div>

                    <div class="flex items-center gap-2 pt-1">
                        <input type="checkbox" id="remember"
                            class="rounded text-indigo-600 focus:ring-indigo-500 border-slate-200" />
                        <label Skinner input id="remember"
                            class="text-[11px] text-slate-400 font-medium select-none cursor-pointer">Ingat akun saya di
                            perangkat ini</label>
                    </div>

                    <button disabled v-if="isLoading" type="submit"
                        class="w-full py-3.5 bg-indigo-400 text-white text-xs font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/10 uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                        <span>Loading ....</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                     <button v-else type="submit"
                        class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/10 uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                        <span>Masuk Sistem</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </form>

                <div class="text-center pt-4 border-t border-slate-100">
                    <p class="text-xs text-slate-400 font-medium">
                        Belum punya akun?
                        <button @click="showRegisterModal = true"
                            class="text-indigo-600 font-bold hover:underline focus:outline-none ml-1">Daftar
                            Sekarang</button>
                    </p>
                </div>
            </div>

            <div class="text-[10px] text-slate-400 font-medium text-center lg:text-left">
                &copy; 2026 Ashri Prastiko Juned. All rights reserved.
            </div>
        </div>

        <div
            class="hidden lg:flex lg:w-[55%] bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-700 relative items-center justify-center p-12 overflow-hidden">
            <div class="absolute w-[500px] h-[500px] bg-white/5 rounded-full -top-20 -right-20 blur-3xl"></div>
            <div class="absolute w-[300px] h-[300px] bg-indigo-500/20 rounded-full -bottom-10 -left-10 blur-2xl"></div>

            <div class="max-w-md text-center space-y-6 relative z-10 text-white">
                <div
                    class="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-2 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4 1.253" />
                    </svg>
                </div>
                <h2 class="text-3xl font-black tracking-tight leading-tight">Sistem Informasi Transaksi Bahan Ajar</h2>
                <p class="text-sm text-indigo-100/80 leading-relaxed font-normal">
                    Kemudahan akses, transparansi pelacakan logistik, dan pengelolaan bahan ajar digital dalam satu
                    genggaman platform terintegrasi.
                </p>
            </div>
        </div>

        <div v-if="showRegisterModal"
            class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
            <div
                class="bg-white rounded-[28px] w-full max-w-md p-6 sm:p-8 border border-slate-100 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <button @click="showRegisterModal = false"
                    class="absolute top-5 right-5 w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="space-y-1">
                    <h3 class="text-lg font-black text-slate-950 tracking-tight">Pendaftaran Akun</h3>
                    <p class="text-xs text-slate-400 font-medium">Lengkapi form berikut</p>
                </div>

                <form @submit.prevent="handleRegister" class="space-y-3.5 pt-2">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email</label>
                        <input v-model="registerForm.email" type="text" required placeholder="Contoh: jhon@gmail.com"
                            class="w-full px-4 py-2.5 bg-[#F5F7FA] border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all" />
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama
                            Lengkap</label>
                        <input v-model="registerForm.nama" type="text" required placeholder="Masukkan nama lengkap"
                            class="w-full px-4 py-2.5 bg-[#F5F7FA] border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all" />
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Buat
                            Password</label>
                        <input v-model="registerForm.password" type="password" required placeholder="Minimal 8 karakter"
                            class="w-full px-4 py-2.5 bg-[#F5F7FA] border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all" />
                    </div>

                    <button type="submit"
                        class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition duration-200 shadow-md shadow-indigo-600/10 uppercase tracking-wider mt-4">
                        Daftar Akun Baru
                    </button>
                </form>
            </div>
        </div>

        <div v-if="showForgotPasswordModal"
            class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
            <div
                class="bg-white rounded-[28px] w-full max-w-sm p-6 border border-slate-100 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <button @click="showForgotPasswordModal = false"
                    class="absolute top-5 right-5 w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="space-y-1">
                    <h3 class="text-md font-black text-slate-950 tracking-tight">Pemulihan Password</h3>
                    <p class="text-xs text-slate-400 font-medium">Link instruksi reset password akan dikirim ke email
                        terdaftar NIM Anda.</p>
                </div>

                <form @submit.prevent="handleForgotPassword" class="space-y-3.5 pt-2">
                    <div class="space-y-1.5">
                        <label class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Masukkan email
                            Anda</label>
                        <input v-model="forgotPassword" type="text" required placeholder="Masukkan email anda"
                            class="w-full px-4 py-3 bg-[#F5F7FA] border border-transparent rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all" />
                    </div>

                    <button type="submit"
                        class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition duration-200 shadow-md shadow-indigo-600/10 uppercase tracking-wider mt-2">
                        Kirim Link Pemulihan
                    </button>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { reactive } from 'vue';
import { useToast } from '~/composables/useToast';

definePageMeta({
    layout: false
})

const router = useRouter()
const { setSession} = useAuth();
const {showToast} = useToast();
const isLoading = ref(false);

const showRegisterModal = ref(false);
const showForgotPasswordModal = ref(false);

const loginForm = reactive({
    email : '',
    password : ''
});


const handleLogin = async () => {

    if(!loginForm.nimOrEmail || !loginForm.password){
        showToast('Email dan password wajib disini!','error');
        return;
    }

    isLoading.value = true;
    
    try{
        
        const response = await $fetch('/api/auth/loginapi' ,{
            method: 'POST',
            body : {
                nimOrEmail : loginForm.nimOrEmail,
                password : loginForm.password
            }
        });
        


        if(response.status === 200){

            setSession(response.data);
            showToast('Login berhasil!', 'success');
           
            setTimeout(async () => {

                await navigateTo('/' , {replace : true});

            }, 1200);            



        }

    }catch(error){
        const errorMessage = error.data?.message || 'Gagal masuk ke sistem.'
        showToast(errorMessage, 'error')
        isLoading.value = true;

    }

};
</script>