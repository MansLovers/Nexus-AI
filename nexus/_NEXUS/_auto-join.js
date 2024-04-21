let isJoin = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i;

export async function before(m) {
  if (m.isBaileys && m.fromMe) return !0;
  if (!m.isGroup) return !1;
  let chat = global.db.data.chats[m.chat];
  const isAutoJoin = isJoin.exec(m.text);

  if (chat.autoJoin && isAutoJoin) {
    await this.reply(m.chat, `*Group link join detect!*`, m);
  }
  return !0;
}
