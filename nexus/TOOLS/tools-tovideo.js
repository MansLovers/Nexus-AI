import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";
import { webp2png, webp2mp4 } from "../../lib/webp2mp4.js";
import { Sticker, StickerTypes } from "wa-sticker-formatter";
import { ffmpeg } from "../../lib/converter.js";
let nexus = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!m.quoted)
    throw `[ ! ] Cara Penggunaan Salah\nContoh: Reply Sticker Dengan Caption ${
      usedPrefix + command
    }`;
  let img = await q.download?.();
  let stek = new Sticker(img, {
    pack: packname,
    author: author,
    type: StickerTypes.FULL
  });
  let out;
  await m.reply(wait);
  try {
    if (/webp/g.test(mime)) out = await webp2mp4(img);
    else if (/image/g.test(mime)) out = await uploadImage(img);
    else if (/video/g.test(mime)) out = await uploadFile(img);
    else if (/audio/g.test(mime))
      out = await ffmpeg(
        media,
        [
          "-filter_complex",
          "color",
          "-pix_fmt",
          "yuv420p",
          "-crf",
          "51",
          "-c:a",
          "copy",
          "-shortest"
        ],
        "mp3",
        "mp4"
      );
    if (typeof out !== "string") out = await uploadImage(img);
    else if (/gif/g.test(mime)) out = stek;
  } catch (e) {
    throw e;
  }
  await conn.sendFile(m.chat, out, "tovid.mp4", "[✓] Succes Converting", m);
};

nexus.help = ["tovideo"].map((v) => v + " [ STICKER/AUDIO ]");
nexus.tags = ["tools"];
nexus.command = /^t(o(vid(eos?|s)?|mp4)|vid(eos?|s)?|mp4)$/i;
nexus.register = nexus.limit = true;
export default nexus;
