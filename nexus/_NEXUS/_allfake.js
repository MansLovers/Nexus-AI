import fs from "fs";
import fetch from "node-fetch";
import moment from "moment-timezone";
import axios from "axios";
import speed from "performance-now";

let nexus = (m) => m;
nexus.all = async function (m) {
  let name = await conn.getName(m.sender);
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let pp =
    "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
  let fotonyu = "https://telegra.ph/file/e1047817d256d9e372144.jpg";
  try {
    pp = await this.profilePictureUrl(m.sender, "image");
  } catch (e) {
  } finally {
    global.emror = "https://telegra.ph/file/a6294049a1863a69154cf.jpg";
    global.axios = (await import("axios")).default;
    global.fetch = (await import("node-fetch")).default;
    global.cheerio = (await import("cheerio")).default;
    global.fs = (await import("fs")).default;
    global.bochil = await import("@bochilteam/scraper");
    global.crypto = (await import("crypto")).default;
    global.jimp = (await import("jimp")).default;
    global.Jimp = (await import("jimp")).default;

    global.kontak2 = [
      [
        owner[0],
        await conn.getName(owner[0] + "6283129240927@s.whatsapp.net"),
        "ManTwelve",
        "https://whatsapp.com",
        true
      ]
    ];

    global.fkon = {
      key: {
        fromMe: false,
        participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: "62831292409@s.whatsapp.net" } : {})
      },
      message: {
        contactMessage: {
          displayName: `${name}`,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${
            m.sender.split("@")[0]
          }:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    };
    global.ephemeral = "86400";
    global.ucapan = ucapan();
    global.botdate = date();
    global.fakeig = {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: namebot,
          body: ucapan(),
          thumbnailUrl: pp,
          sourceUrl: sig
        }
      }
    };
  }
};

export default nexus;

function date() {
  let d = new Date(new Date() + 3600000);
  let locale = "id";
  let week = d.toLocaleDateString(locale, {
    weekday: "long"
  });
  let date = d.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  let tgl = `${week}, ${date}`;
  return tgl;
}

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  let res = "Selamat malam ";
  if (time >= 4) {
    res = "Selamat pagi ";
  }
  if (time > 10) {
    res = "Selamat siang ";
  }
  if (time >= 15) {
    res = "Selamat sore ";
  }
  if (time >= 18) {
    res = "Selamat malam ";
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
