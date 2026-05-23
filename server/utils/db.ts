let serverCache: {
    dataPengguna: any[];
    dataProgress: any[];
    dataBahanAjar: any[];
    dataTracking: any[];
    dataTransaksi: any[];
} = {
    dataPengguna: [],
    dataProgress: [],
    dataBahanAjar: [],
    dataTracking: [],
    dataTransaksi: []
};
let isInitialized = false;

export const userServerDB = async () => {

    const config = useRuntimeConfig();
    const BASE_URL = config.baseUrl;

    if (!BASE_URL) {
        console.log("config base url tidak ketemu pada config");
    }
    if (!isInitialized && BASE_URL) {

        try {


            const [pengguna, progress, bahanAjar, tracking, transaksi] = await Promise.all([
                $fetch<any[]>(`${BASE_URL}/dataPengguna`),
                $fetch<any[]>(`${BASE_URL}/dataProgress`),
                $fetch<any[]>(`${BASE_URL}/dataBahanAjar`),
                $fetch<any[]>(`${BASE_URL}/dataTracking`),
                $fetch<any[]>(`${BASE_URL}/dataTransaksi`)
            ]);

            serverCache.dataPengguna = pengguna || [];
            serverCache.dataProgress = progress || [];
            serverCache.dataBahanAjar = bahanAjar || [];
            serverCache.dataTracking = tracking || [];
            serverCache.dataTransaksi = transaksi || [];

            isInitialized = true;
            console.log('Mirroring selesai. Semua resource siap di memori server.');

        } catch (error) {
            console.error('Gagal inisialisasi data dari My JSON Server:', error);
        }
    }

    return {
        pengguna: {
            getAll: () => serverCache.dataPengguna,
            findByEmail: (email: string) => serverCache.dataPengguna.find(u => u.email === email),
            add: (user: any) => {
                const newId = (serverCache.dataPengguna.length + 1).toString();
                const newUser = { id: newId, ...user };
                serverCache.dataPengguna.push(newUser);
                return newUser;
            }
        },
        progress: {
            getAll: () => serverCache.dataProgress,
            getByUserId: (userId: number) => serverCache.dataProgress.filter(p => p.iduser === userId),
            add: (prog: any) => {
                const newId = (serverCache.dataProgress.length + 1).toString();
                const newProg = { id: newId, ...prog };
                serverCache.dataProgress.push(newProg);
                return newProg;
            }
        }, bahanAjar: {
            getAll: () => serverCache.dataBahanAjar,
            getById: (id: string) => serverCache.dataBahanAjar.find(b => b.id === id),
            reduceStock: (id: string, qty: number): boolean => {
                const book = serverCache.dataBahanAjar.find(b => b.id === id);
                if (book && book.stok >= qty) {
                    book.stok -= qty; // Kurangi jumlah stok di memori server
                    return true;
                }
                return false;
            }
        },
        tracking: {
            getAll: () => serverCache.dataTracking,
            getById: (id: string) => serverCache.dataTracking.find(t => t.id === id),
            getByUserId: (userId: number) => serverCache.dataTracking.filter(t => t.idUser === userId),
            add: (track: any) => {
                const newId = "202300" + (serverCache.dataTracking.length + 5679).toString();
                const newTrack = { id: newId, nomorDO: newId, ...track, perjalanan: track.perjalanan || [] };
                serverCache.dataTracking.push(newTrack);
                return newTrack;
            }
        }, transaksi: {
            getAll: () => serverCache.dataTransaksi,
            getByUserId: (userId: any) => {
                return (serverCache.dataTransaksi || []).filter(t =>
                    String(t.idUser).trim() === String(userId).trim()
                )
            },
            add: (trx: any) => {
                const newId = `TX-20260500${serverCache.dataTransaksi.length + 1}`;
                const newTrx = { id: newId, tanggalTransaksi: new Date().toISOString().replace('T', ' ').substring(0, 19), ...trx };
                serverCache.dataTransaksi.push(newTrx);
                return newTrx;
            }
        }
    }


};