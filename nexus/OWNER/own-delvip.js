async function nexus(m, { text, usedPrefix, command, conn }) {
  function no(number) {
    return number.replace(/\s/g, "").replace(/([@+-])/g, "");
  }
  if (!text)
    return conn.reply(
      m.chat,
      `[ ! ] Cara Pemakaian Salah\nContoh: ${usedPrefix + command} @${
        m.sender.split("@")[0]
      }`,
      m
    );
  text = no(text) + "@s.whatsapp.net";
  global.db.data.users[text].vip = false;
  global.db.data.users[text].vipDate = 0;
  m.reply(`[✓] Permintaan Menghapus Vip User @${text.split("@")[0]}.*`);
}
nexus.help = ["delvip"].map((v) => v + " [ TAG/NUMBER ]");
nexus.tags = ["owner"];
nexus.command = /^(delvip)$/i;
nexus.rowner = true;
export default nexus;
