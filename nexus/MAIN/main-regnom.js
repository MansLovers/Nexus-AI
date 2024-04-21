import { createHash } from "crypto";
const otps = {};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000);
}

const nexus = async (m, { conn, text, usedPrefix, command }) => {
  const name = await conn.getName(m.sender);
  const sn = createHash("md5").update(m.sender).digest("hex");
  const user = global.db.data.users[m.sender];
  const phone = text.trim();
  const otpCode = generateOtp();
  const potp = `Terimakasih telah mendaftar kepada *${namebot}*
Berikut ini adalah kode otp anda untuk verifikasi

[ *${otpCode}* ]

Kode otp hanya dapat digunakan 1 kali dan waktu pendaftaran hanya 5 menit. Dan Cara Mengunakanya adalah .verotp [ CODE ]
`;
  switch (command) {
    case "regnom":
      if (!user.registered) {
        if (!text) {
          return m.reply(
            `[ ! ] Cara Penggunaan Salah\nContoh: ${usedPrefix + command} nomor`
          );
        }
        otps[m.sender] = {
          code: otpCode,
          expiresAt: Date.now() + 300000
        };

        conn.reply(phone + "@s.whatsapp.net", potp, m);
        m.reply(`Kode OTP telah dikirim kepada *@${m.sender.split("@")[0]}*`);
      } else {
        return m.reply("[ ! ] Kamu sudah terdaftar!");
      }
      break;
    case "verotp":
      const userOtp = otps[m.sender];
      if (!userOtp) {
        throw `[ ! ] Anda Belum Terdaftar`;
      }
      if (userOtp.expiresAt < Date.now()) {
        delete otps[m.sender];
        throw `[ ! ] Code Telah Kadaluarsa Silahkan Untuk Mendaftar Ulang`;
      }

      if (userOtp.code !== parseInt(text)) {
        throw "[ ! ] Code Salah, Silahkan Coba Lagi";
      }

      delete otps[m.sender];
      user.registered = true;
      m.reply(`[✓] Pendaftaran Ke ${namebot} Berhasil`);
      break;
  }
};

nexus.help = ["regnom"].map((v) => v + " [ NAMA.UMUR ]");
nexus.command = /^(regnom|verotp)$/i;
nexus.tags = ["main"];
nexus.group = true;

export default nexus;
