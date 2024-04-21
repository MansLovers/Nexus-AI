let nexus = async function (m) {
  let user = global.db.data.users[m.sender];
  let ran = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (user.registered === true)
    throw `[ ! ] Kamu Sudah Terdaftar Di ${namebot}`;
  let age = ran.getRandom() * 2;
  user.name = m.name;
  user.age = age;
  user.regTime = +new Date();
  user.registered = true;
  m.reply(`[✓] Pendaftaran Ke ${namebot} Berhasil`);
};
nexus.help = ["daftar2"].map((v) => v + " [ OTOMATIS ]");
nexus.tags = ["main"];
nexus.command = /^(daftar2|reg(ister2)?)$/i;

export default nexus;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
