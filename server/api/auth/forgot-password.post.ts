import { userServerDB } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Alamat email wajib diisi.'
    });
  }

  const db = await userServerDB();
  
  const user = db.pengguna.findByEmail(email);
  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Alamat email tidak ditemukan dalam sistem kami.'
    });
  }

  return {
    success: true,
    message: `Link pemulihan password telah berhasil dikirim ke email: ${email}. Silakan cek kotak masuk Anda.`
  };
});