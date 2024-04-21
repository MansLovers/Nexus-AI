export async function before(m, { conn, func, groupMetadata }) {
  if (!m.isGroup) return !0;

  let chat = db.data.chats[m.chat];
  let mode = await conn.groupMetadata(m.chat);
  if (chat.acc) return !0;
  if (mode.joinApprovalMode) return !0;
  conn.groupRequestParticipantsList(m.chat).then(async (data) => {
    if (data.length === 0) return;
    for (let i of data) {
      await conn.groupRequestParticipantsUpdate(m.chat, [i.jid], "approve");
      await func.delay(20000);
    }
  });
}
