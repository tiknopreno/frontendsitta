import { computed, onMounted } from 'vue'

export const useAuth = () => {
    const user = useState<any>('auth-user', () => null)


    const isLoggedIn = computed(() => !!user.value)


    onMounted(() => {
        if (import.meta.client && !user.value) {
            const savedSession = localStorage.getItem('user_session')
            if (savedSession) {
                try {
                    user.value = JSON.parse(savedSession)
                    console.log('Sesi berhasil dipulihkan otomatis dari localStorage:', user.value)
                } catch (e) {
                    localStorage.removeItem('user_session')
                }
            }
        }
    })

    const setSession = (userData: any) => {
        user.value = userData
        if (import.meta.client) {
            localStorage.setItem('user_session', JSON.stringify(userData))
        }
    }

    const logout = () => {
        user.value = null
        if (import.meta.client) {
            localStorage.removeItem('user_session')
        }
        navigateTo('/login')
    }

    return {
        user,
        isLoggedIn,
        setSession,
        logout
    }
}