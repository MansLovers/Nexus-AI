import { tiktok } from "../../Nova/Nexen/nexus.js";

let nexus = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `[ ! ] Masukan Link`;
  try {
  m.reply(wait)
    if (command === "tiktok" || command === "tt") {
      let result = await tiktok(text);
      conn.sendFile(m.chat, result.data.play, "tobrut.mp4", result.data.title, m);
    }
    
    if (command === "tiktokslide" || command === "ttslide") {
      let result = await tiktok(text);
      for (let img of result.data.images) {
        conn.sendFile(m.chat, img, "tobrut.jpg", result.data.title, m);
      }
    }
  } catch (e) {
    console.error(e);
    m.reply(eror);
  }
};

nexus.help = ["tiktok"].map((v) => v + " [ TEXT ]");
nexus.tags = ["download"];
nexus.command = /^(tiktok|tt|tiktokslide|ttslide)$/i;
nexus.register = nexus.limit = true;

export default nexus;
