import { userServerDB } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email dan password harus diisi.'
        });
    }

    const db = await userServerDB();

    const user = db.pengguna.findByEmail(email);

    if (!user || !comparePassword(password , user.password)) {
        throw createError({
            statusCode: 401,
            message: 'Email atau password salah.'
        });
    }

    return {
        success: true,
        message: 'Login berhasil!',
        user: {
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            lokasi: user.lokasi
        }
    };
});