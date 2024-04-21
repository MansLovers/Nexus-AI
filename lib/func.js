import axios from "axios";
import cheerio from "cheerio";
import Jimp from "jimp";
import crypto from "crypto";
import path from "path";
import { tmpdir } from "os";
import fs from "fs";
import ff from "fluent-ffmpeg";
import webp from "node-webpmux";

async function imageToWebp(media) {
  const tmpFileOut = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.webp`
  );
  const tmpFileIn = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.jpg`
  );

  fs.writeFileSync(tmpFileIn, media);

  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `scale=512:512:force_original_aspect_ratio=increase,fps=15,crop=512:512`
      ])
      .toFormat("webp")
      .save(tmpFileOut);
    //.addOutputOptions([
    //"-vcodec",
    //"libwebp",
    //"-vf",
    //"scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
    //])
    //.toFormat("webp")
    //.save(tmpFileOut)
  });

  const buff = fs.readFileSync(tmpFileOut);
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);
  return buff;
}

async function videoToWebp(media) {
  const tmpFileOut = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.webp`
  );
  const tmpFileIn = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.mp4`
  );

  fs.writeFileSync(tmpFileIn, media);

  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `scale=512:512:force_original_aspect_ratio=increase,fps=15,crop=512:512`
      ])
      .toFormat("webp")
      .save(tmpFileOut);
    //.addOutputOptions([
    //"-vcodec",
    //"libwebp",
    //"-vf",
    //"scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
    //"-loop",
    //"0",
    //"-ss",
    //"00:00:00",
    //"-t",
    //"00:00:05",
    //"-preset",
    //"default",
    //"-an",
    //"-vsync",
    //"0"
    //])
    //.toFormat("webp")
    //.save(tmpFileOut)
  });

  const buff = fs.readFileSync(tmpFileOut);
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);
  return buff;
}

async function fetchBuffer(url, options) {
  try {
    options ? options : {};
    const res = await axios({
      method: "GET",
      url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
        DNT: 1,
        "Upgrade-Insecure-Request": 1
      },
      ...options,
      responseType: "arraybuffer"
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

async function fetchJson(url, options) {
  try {
    options ? options : {};
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
      ...options
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

async function writeExif(media, metadata) {
  let wMedia = /webp/.test(media.mimetype)
    ? media.data
    : /image/.test(media.mimetype)
    ? await imageToWebp(media.data)
    : /video/.test(media.mimetype)
    ? await videoToWebp(media.data)
    : "";
  const tmpFileIn = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.webp`
  );
  const tmpFileOut = path.join(
    tmpdir(),
    `${crypto.randomBytes(10).toString("hex")}.webp`
  );
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const json = {
      "sticker-pack-id": `Nightmare - md`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""]
    };
    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
    ]);
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    fs.unlinkSync(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  }
}

function _token(host) {
  return new Promise(async (resolve, reject) => {
    axios
      .request({ url: host, method: "GET", headers: headers })
      .then(({ data: data }) => {
        let token = cheerio.load(data)("#token").attr("value");
        resolve(token);
      });
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const delay = (time) => new Promise((res) => setTimeout(res, time));
function generate(n) {
  var max = 11;
  if (n > max) return generate(max) + generate(n - max);
  var min = (max = Math.pow(10, n + 1)) / 10;
  return ("" + (Math.floor(Math.random() * (max - min + 1)) + min)).substring(
    1
  );
}
async function getBuffer(url, options) {
  try {
    return (
      await axios({
        method: "get",
        url: url,
        headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
        ...options,
        responseType: "arraybuffer"
      })
    ).data;
  } catch (err) {
    return err;
  }
}
const getRandom = (ext) => `${Math.floor(1e4 * Math.random())}${ext}`,
  headers = {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    cookie:
      "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
  };
function isNumber(number) {
  return number
    ? "number" == typeof (number = parseInt(number)) && !isNaN(number)
    : number;
}
function isUrl(string) {
  try {
    return new URL(string), !0;
  } catch (err) {
    return !1;
  }
}
function niceBytes(x) {
  let l = 0,
    n = parseInt(x, 10) || 0;
  for (; n >= 1024 && ++l; ) n /= 1024;
  return (
    n.toFixed(n < 10 && l > 0 ? 1 : 0) +
    " " +
    ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][l]
  );
}
function padLead(num, size) {
  for (var s = num + ""; s.length < size; ) s = "0" + s;
  return s;
}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
function ranNumb(min, max = null) {
  return null !== max
    ? ((min = Math.ceil(min)),
      (max = Math.floor(max)),
      Math.floor(Math.random() * (max - min + 1)) + min)
    : Math.floor(Math.random() * min) + 1;
}
const readMore = String.fromCharCode(8206).repeat(4001);
async function resize(buffer, width, height) {
  var oyy = await Jimp.read(buffer);
  return await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG);
}
function runtime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / 86400),
    h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = Math.floor(seconds % 60);
  return (
    (d > 0 ? d + (1 == d ? " day, " : " days, ") : "") +
    (h > 0 ? h + (1 == h ? " hour, " : " hours, ") : "") +
    (m > 0 ? m + (1 == m ? " minute, " : " minutes, ") : "") +
    (s > 0 ? s + (1 == s ? " second" : " seconds") : "")
  );
}
function runtimes(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / 86400),
    h = Math.floor((seconds % 86400) / 3600),
    m = Math.floor((seconds % 3600) / 60),
    s = Math.floor(seconds % 60);
  return (
    (d > 0 ? d + "d " : "") +
    (h < 10 ? "0" + h + ":" : h > 0 ? h + ":" : "") +
    (m < 10 ? "0" + m + ":" : m > 0 ? m + ":" : "") +
    (s < 10 ? "0" + s : s > 0 ? s : "")
  );
}
const someincludes = (data, id) => !!data.find((el) => id.includes(el)),
  somematch = (data, id) => !!data.find((el) => el === id);
function stream2buffer(stream) {
  return new Promise((resolve, reject) => {
    const _buf = [];
    stream.on("data", (chunk) => _buf.push(chunk)),
      stream.on("end", () => resolve(Buffer.concat(_buf))),
      stream.on("error", (err) => reject(err));
  });
}
export {
  _token,
  capitalizeFirstLetter,
  delay,
  generate,
  getBuffer,
  getRandom,
  headers,
  isUrl,
  isNumber,
  fetchJson,
  fetchBuffer,
  imageToWebp,
  videoToWebp,
  writeExif,
  niceBytes,
  padLead,
  pickRandom,
  ranNumb,
  resize,
  runtime,
  runtimes,
  readMore,
  someincludes,
  somematch,
  stream2buffer
};
