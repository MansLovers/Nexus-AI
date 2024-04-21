import { createHash } from "crypto";

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let nexus = async function (m, { text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  if (user.registered === true)
    throw `[ ! ] Kamu Sudah Terdaftar Di ${namebot}`;
  if (!Reg.test(text))
    return m.reply(
      `[ ! ] Cara Penggunaan Salah\nContoh: ${
        usedPrefix + command
      } ${conn.getName(m.sender)}.18`
    );
  let [_, name, splitter, age] = text.match(Reg);
  if (!name) throw "[ ! ] Nama Tidak Boleh Kosong";
  if (!age) throw "[ ! ] Umur Tidak Boleh Kosong";
  age = parseInt(age);
  if (age > 60) throw "[ ! ] Umur Maximal 60 Tahun Ya Puh";
  if (age < 5) throw "[ ! ] Masih Adek Adek Mending Nyusu Aja";
  user.name = name.trim();
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;
  m.reply(
    `[✓] Pendaftaran Ke ${namebot} Berhasil Dengan Nama ${name} Dan Umur ${age}`
  );
};
nexus.help = ["daftar"].map((v) => v + " [ NAMA.UMUR ]");
nexus.tags = ["main"];
nexus.command = /^(daftar|reg(ister)?)$/i;

export default nexus;
