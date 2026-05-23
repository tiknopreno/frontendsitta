import { userServerDB } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const { nama, email, password, role, lokasi } = body;

    if (!nama || !email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Nama, email, dan password wajib diisi.'
        });
    }

    const db = await userServerDB();

    const userExist = db.pengguna.findByEmail(email);
    if (userExist) {
        throw createError({
            statusCode: 400,
            message: 'Email sudah terdaftar di sistem.'
        });
    }

    const newUser = db.pengguna.add({
        nama,
        email,
        password,
        role: role || 'User',
        lokasi: lokasi || 'Pusat'
    });


    return {
        success: true,
        message: "Registrasi Berhasil ! Silahkan login.",
        user: {
            id: newUser.id,
            nama: newUser.nama,
            email: newUser.email,
            role: newUser.role
        }
    };


});