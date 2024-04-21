import uploadFile from "../../lib/uploadFile.js";
import uploadImage from "../../lib/uploadImage.js";

let nexus = async (m, { usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime)
    throw `[ ! ] Cara Penggunaan Salah\nContoh: ${usedPrefix + command}`;
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await (isTele ? uploadImage : uploadFile)(media);
  await m.reply(wait);
  let caption = `\`UPLOAD IMAGE TO LINK\`
${link}
\`Size:\` ${formatBytes(media.length)}
\`Expired:\` ${isTele ? "No Expiry Date" : "Unknown"}`;

  await m.reply(caption);
};
nexus.help = ["tourl"].map((v) => v + " [ FOTO ]");
nexus.tags = ["tools"];
nexus.command = /^(tourl|t)$/i;
nexus.limit = nexus.register = true;
export default nexus;

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
