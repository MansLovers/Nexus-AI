import fetch from "node-fetch";
import { format } from "util";

async function verline(m, { text, usedPrefix, command, conn }) {
  if (!/^https?:\/\//.test(text))
    throw `[ ! ] Cara Penggunaan Salah\nContoh: ${
      usedPrefix + command
    } https://telegra.ph/file/99338539431b7fb74e7f9.jpg\n\nDan Di Awali Dengan https://`;
  let _url = new URL(text);
  let url = global.API(
    _url.origin,
    _url.pathname,
    Object.fromEntries(_url.searchParams.entries()),
    "APIKEY"
  );
  let res = await fetch(url);
  if (res.headers.get("content-length") > 100 * 1024 * 1024 * 1024) {
    throw `Content-Length: ${res.headers.get("content-length")}`;
  }
  m.reply(wait);
  if (!/text|json/.test(res.headers.get("content-type")))
    return conn.sendFile(m.chat, url, "file", text, m);
  let txt = await res.buffer();
  try {
    txt = format(JSON.parse(txt + ""));
  } catch (e) {
    txt = txt + "";
  } finally {
    m.reply(txt.slice(0, 65536) + "");
  }
}

verline.help = ["fetch"].map((v) => v + " [ LINK ]");
verline.tags = ["main"];
verline.command = /^(fetch|get)$/i;
export default verline;
