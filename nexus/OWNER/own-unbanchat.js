let nexus = async (m, { conn, isOwner, text }) => {
  let who;
  if (m.isGroup) {
    if (isOwner) {
      who = m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.quoted
        ? m.quoted.sender
        : text
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
        : m.chat;
    } else {
      who = m.chat;
    }
  } else {
    who = text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.chat;
  }

  try {
    if (who.endsWith("g.us")) {
      global.db.data.chats[who].isBanned = false;
    } else {
      global.db.data.users[who].banned = false;
    }
    m.reply(
      `Berhasil unban! ${await conn.user.name} aktif dichat ${
        (await conn.getName(who)) == undefined ? "ini" : await conn.getName(who)
      }.`
    );
  } catch (e) {
    throw `Nomor tidak ada di database!`;
  }
};

nexus.help = ["unbanchat"];
nexus.tags = ["owner"];
nexus.command = /^(unbanchat)$/i;
nexus.rowner = true;

export default nexus;
