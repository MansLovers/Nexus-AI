let nexus = async (m, { conn, usedPrefix, command, args: [event], text }) => {
  if (!text)
    return await conn.reply(
      m.chat,
      `[ ! ] Cara Penggunaan Salah\nContoh: ${usedPrefix + command} welcome @${
        m.sender.split("@")[0]
      }`.trim(),
      m
    );
  let mentions = text.replace(event, "").trimStart();
  let who = mentions ? conn.parseMention(mentions) : [];
  let part = who.length ? who : [m.sender];
  let act = false;
  m.reply(wait);
  switch (event.toLowerCase()) {
    case "add":
    case "invite":
    case "welcome":
      act = "add";
      break;
    case "bye":
    case "kick":
    case "leave":
    case "remove":
      act = "remove";
      break;
    case "promote":
      act = "promote";
      break;
    case "demote":
      act = "demote";
      break;
    default:
      throw eror;
  }
  if (act)
    return conn.participantsUpdate({
      id: m.chat,
      participants: part,
      action: act
    });
};
nexus.help = ["simulate"].map((v) => v + " [ OPTION ]");
nexus.command = /^simulate$/i;
nexus.tags = ["owner"];
nexus.rowner = true;
export default nexus;
