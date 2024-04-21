import { createHash } from "crypto";

let nexus = async function (m, { text, conn, command, usedPrefix, args }) {
  if (!args[0])
    throw `[ ! ] Cara Penggunaan Salah\nKetik .CEKSN Untuk Mengetahui SN\nContoh: ${
      usedPrefix + command
    } SN`;

  let user = global.db.data.users[m.sender];
  let age = user.age;
  let sn = createHash("md5").update(m.sender).digest("hex");

  if (args[0] !== sn) throw "[ ! ] Nomor Serial Salah Silakan Cek .CEKSN";

  m.reply(`[✓] Berhasil Berhenti Menjadi Pengguna ${namebot}`);
  user.registered = false;
};

nexus.help = ["unregister"].map((v) => v + " [ SN ]");
nexus.tags = ["main"];
nexus.command = /^unreg(ister)?$/i;
nexus.register = true;

export default nexus;
