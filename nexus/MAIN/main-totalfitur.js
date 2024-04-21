let nexus = async (m, { conn, text, usedPrefix, command }) => {
  let fitur = Object.values(global.nexus)
    .filter((v) => v.help && !v.disabled)
    .map((v) => v.help)
    .flat(1);
  let txt = `\`${namebot}\`\n`;
  txt += `> *Total* : ${fitur.length}`;
  await conn.relayMessage(
    m.chat,
    {
      requestPaymentMessage: {
        currencyCodeIso4217: "IDR",
        amount1000: "40000000",
        requestFrom: "0@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: txt,
            contextInfo: {
              mentionedJid: [m.sender],
              externalAdReply: {
                showAdAttribution: true
              }
            }
          }
        }
      }
    },
    {}
  );
};
nexus.help = ["totalfitur"];
nexus.tags = ["main"];
nexus.command = /^(feature|totalfitur)$/i;
export default nexus;
