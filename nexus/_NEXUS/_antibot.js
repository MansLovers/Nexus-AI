let nexus = (m) => m;

nexus.before = async function (m, { conn }) {
  if (!m.isGroup) return !0;
  let chat = global.db.data.chats[m.chat];
  if (!m.isBaileys && !m.fromMe) return !0;
  if (chat.antiBot) {
    await conn.reply(m.chat, "*[ BOT LAIN TERDETEKSI ]*", m);
    await conn.delay(1000);
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
  }
};

export default nexus;
