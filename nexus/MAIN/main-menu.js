import { promises } from "fs";
import { join } from "path";
import { xpRange } from "../../lib/levelling.js";
import moment from "moment-timezone";
import os from "os";
import fs from "fs";
let tags = {
  main: "MENU MAIN",
  ai: "MENU AI",
  tools: "MENU TOOLS",
  download: "MENU DOWNLOAD",
  owner: "MENU OWNER"
};
const defaultMenu = {
  before:
    `%ucapan kak %name Saya Adalah Nexus Ai, Apa yang bisa saya lakukan untuk Anda? Saya dirancang untuk memberikan informasi, melakukan tugas tertentu, dan memberikan dukungan langsung melalui pesan WhatsApp.

⌬〡 Nama : %name
⌬〡 Limit : %limit
⌬〡 Device : %platform
⌬〡 Runtime : %muptime
⌬〡 Date : %date
⌬〡 Totalreg : %totalreg

╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
_Please don't be too spamm._
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
%readmore
`.trimStart(),
  header: "╭─⋠ %category ⋡",
  body: "╎❈ %cmd",
  footer: "╰──〢",
  after: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɴʏᴏᴍᴀɴ"
};
let verline = async (m, { conn, usedPrefix: _p, __dirname }) => {
  let tag = `@${m.sender.split("@")[0]}`;
  //-----------TIME---------
  let d = new Date(new Date() + 3600000);
  let locale = "id";
  let week = d.toLocaleDateString(locale, { weekday: "long" });
  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  // d.getTimeZoneOffset()
  // Offset -420 is 18.00
  // Offset    0 is  0.00
  // Offset  420 is  7.00
  let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor(d / 84600000) % 5
  ];
  let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(d);
  let time = d.toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });
  let _uptime = process.uptime() * 1000;
  let _muptime;
  if (process.send) {
    process.send("uptime");
    _muptime =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  let muptime = clockString(_uptime);
  let uptime = clockString(_uptime);
  let _mpt;
  if (process.send) {
    process.send("uptime");
    _mpt =
      (await new Promise((resolve) => {
        process.once("message", resolve);
        setTimeout(resolve, 1000);
      })) * 1000;
  }
  let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
  let mode = global.opts["self"] ? "Private" : "Publik";
  let _package =
    JSON.parse(
      await promises
        .readFile(join(__dirname, "../package.json"))
        .catch((_) => ({}))
    ) || {};
  let { age, exp, limit, level, role, registered, money } =
    global.db.data.users[m.sender];
  let { min, xp, max } = xpRange(level, global.multiplier);
  let name = await conn.getName(m.sender);
  let premium = global.db.data.users[m.sender].premiumTime;
  let owners = global.db.data.users[m.sender].ownersTime;
  let prems = `${premium > 0 ? "Premium" : "Free"}`;
  let owns = `${owners > 0 ? "owner" : "user"}`;
  let platform = os.platform();
  let totalreg = Object.keys(global.db.data.users).length;
  let rtotalreg = Object.values(global.db.data.users).filter(
    (user) => user.registered == true
  ).length;
  let help = Object.values(global.nexus)
    .filter((nexus) => !nexus.disabled)
    .map((nexus) => {
      return {
        help: Array.isArray(nexus.tags) ? nexus.help : [nexus.help],
        tags: Array.isArray(nexus.tags) ? nexus.tags : [nexus.tags],
        prefix: "customPrefix" in nexus,
        limit: nexus.limit,
        premium: nexus.premium,
        owner: nexus.owner || nexus.rowner,
        enabled: !nexus.disabled
      };
    });
  let groups = {};
  for (let tag in tags) {
    groups[tag] = [];
    for (let nexus of help)
      if (nexus.tags && nexus.tags.includes(tag))
        if (nexus.help) groups[tag].push(nexus);
  }
  conn.menu = conn.menu ? conn.menu : {};
  let before = conn.menu.before || defaultMenu.before;
  let header = conn.menu.header || defaultMenu.header;
  let body = conn.menu.body || defaultMenu.body;
  let footer = conn.menu.footer || defaultMenu.footer;
  let after =
    conn.menu.after ||
    (conn.user.jid == global.conn.user.jid
      ? ""
      : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) +
      defaultMenu.after;
  let _text = [
    before,
    ...Object.keys(tags).map((tag) => {
      return (
        header.replace(/%category/g, tags[tag]) +
        "\n" +
        [
          ...help
            .filter((menu) => menu.tags && menu.tags.includes(tag) && menu.help)
            .map((menu) => {
              return menu.help
                .map((help) => {
                  return body
                    .replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
                    .replace(/%islimit/g, menu.limit ? "Ⓛ" : "")
                    .replace(/%isPremium/g, menu.premium ? "🅟" : "")
                    .replace(/%isOwner/g, menu.owner ? "㉧" : "")
                    .trim();
                })
                .join("\n");
            }),
          footer
        ].join("\n")
      );
    }),
    after
  ].join("\n");
  let text =
    typeof conn.menu == "string"
      ? conn.menu
      : typeof conn.menu == "object"
      ? _text
      : "";
  let replace = {
    "%": "%",
    p: uptime,
    muptime,
    ucapan: ucapan(),
    me: conn.getName(conn.user.jid),
    npmname: _package.name,
    npmdesc: _package.description,
    version: _package.version,
    exp: exp - min,
    maxexp: xp,
    totalexp: exp,
    xp4levelup: max - exp,
    github: _package.homepage
      ? _package.homepage.url || _package.homepage
      : "[unknown github url]",
    tag,
    platform,
    wib,
    mode,
    _p,
    money,
    age,
    tag,
    name,
    prems,
    owns,
    level,
    limit,
    name,
    weton,
    week,
    date,
    dateIslamic,
    time,
    totalreg,
    rtotalreg,
    role,
    readmore: readMore
  };
  text = text.replace(
    new RegExp(
      `%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`,
      "g"
    ),
    (_, name) => "" + replace[name]
  );
  let gif = "https://telegra.ph/file/8519443659f6c67a8bb7e.mp4";
  let _menu = global.db.data.settings[conn.user.jid];

  if (_menu.image) {
    conn.sendMessage(
      m.chat,
      {
        text: await style(text),
        contextInfo: {
          externalAdReply: {
            title: namebot,
            body: "Creator :" + nameown,
            thumbnailUrl: thumb,
            sourceUrl: sgc,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );
  } else if (_menu.gif) {
    conn.sendMessage(
      m.chat,
      {
        video: { url: gif },
        gifPlayback: true,
        caption: await style(text),
        mentionedJid: [m.sender],
        contextInfo: {
          externalAdReply: {
            title: namebot,
            body: "Creator :" + nameown,
            thumbnailUrl: thumb,
            sourceUrl: sgc,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted: m }
    );
  } else if (_menu.teks) {
    conn.reply(m.chat, await style(text), m);
  } else if (_menu.doc) {
    conn.sendMessage(m.chat, {
      document: fs.readFileSync("./package.json"),
      fileName: namebot,
      fileLength: 20239999999999,
      pageCount: "2024",
      caption: await style(text),
      mentionedJid: [m.sender],
      contextInfo: {
        externalAdReply: {
          containsAutoReply: true,
          mediaType: 1,
          mediaUrl: "https://telegra.ph/file/2bb8c49dd86c6d6dc0745.mp4",
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: sig,
          thumbnailUrl: thumb,
          title: `${date}`,
          body: "Creator : " + nameown
        }
      }
    });
  }
};
verline.command = /^(menu)$/i;
verline.register = true;
verline.exp = 7;

export default verline;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat malam 🌃";
  if (time >= 4) {
    res = "Selamat pagi 🌄";
  }
  if (time > 10) {
    res = "Selamat siang 🏜️";
  }
  if (time >= 15) {
    res = "Selamat sore 🌇";
  }
  if (time >= 18) {
    res = "Selamat malam 🌃";
  }
  return res;
}

function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, " H ", m, " M ", s, " S "]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10;
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12;
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30;
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    ye,
    " *Years 🗓️*\n",
    mo,
    " *Month 🌙*\n",
    d,
    " *Days ☀️*\n",
    h,
    " *Hours 🕐*\n",
    m,
    " *Minute ⏰*\n",
    s,
    " *Second ⏱️*"
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
