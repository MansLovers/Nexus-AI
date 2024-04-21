import { watchFile, unwatchFile } from "fs";
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

// Owner
global.owner = [["6283129240927", "ManTwelve", true]];
global.mods = [];
global.prems = [];
// Info
global.namebot = "Nexus Ai";
global.nameown = "ManTwelve";
global.nomorown = "6283129240927";
// wel/good
global.wm = "Ganteng";
global.wel = "https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4";
global.good = "https://telegra.ph/file/1c05b8c019fa525567d01.mp4";
global.logo = "https://telegra.ph/file/2d7bf4c007600e7e1db4d.jpg";
global.thumb = global.thumbnail =
  "https://telegra.ph/file/99338539431b7fb74e7f9.jpg";
global.ppKosong = "https://i.ibb.co/3Fh9V6p/avatar-contact.png";
global.packname = "Created By";
global.stickpack = packname;
global.author = "ManTwelve";
global.stickauth = author + "\nwa.me/" + nomorown;
// Sosmed
global.sig = "https://instagram.com/mans_sudirta";
global.sgc = "https://instagram.com/mans_sudirta";
// => m.chat
global.idgc = "120363217877758434@g.us";
// Info Wait
global.wait = "[ ! ] Permintaan Sedang Di Proses";
global.eror = "[ ! ] Terjadi Kesalahan Pada Permintaan";

global.multiplier = 69;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      agility: "🤸‍♂️",
      arc: "🏹",
      armor: "🥼",
      bank: "🏦",
      bibitanggur: "🍇",
      bibitapel: "🍎",
      bibitjeruk: "🍊",
      bibitmangga: "🥭",
      bibitpisang: "🍌",
      bow: "🏹",
      bull: "🐃",
      cat: "🐈",
      chicken: "🐓",
      common: "📦",
      cow: "🐄",
      crystal: "🔮",
      darkcrystal: "♠️",
      diamond: "💎",
      dog: "🐕",
      dragon: "🐉",
      elephant: "🐘",
      emerald: "💚",
      exp: "✉️",
      fishingrod: "🎣",
      fox: "🦊",
      gems: "🍀",
      giraffe: "🦒",
      gold: "👑",
      health: "❤️",
      horse: "🐎",
      intelligence: "🧠",
      iron: "⛓️",
      keygold: "🔑",
      keyiron: "🗝️",
      knife: "🔪",
      legendary: "🗃️",
      level: "🧬",
      limit: "🌌",
      lion: "🦁",
      magicwand: "⚕️",
      mana: "🪄",
      money: "💵",
      mythic: "🗳️",
      pet: "🎁",
      petFood: "🍖",
      pickaxe: "⛏️",
      pointxp: "📧",
      potion: "🥤",
      rock: "🪨",
      snake: "🐍",
      stamina: "⚡",
      strength: "🦹‍♀️",
      string: "🕸️",
      superior: "💼",
      sword: "⚔️",
      tiger: "🐅",
      trash: "🗑",
      uncommon: "🎁",
      upgrader: "🧰",
      wood: "🪵",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

// Apikey
global.lol = "GataDios";
global.skizo = "Chainga";

global.APIs = {
  xyro: "https://api.xyroinee.xyz",
  lol: "https://api.lolhumaan.xyz",
};

//Apikey
global.APIKeys = {
  "https://api.xyroinee.xyz": "vRFLiyLPWu",
  "https://api.lolhumaan.xyz": "GataDios",
};

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update 'Ventures.js'"));
  import(`${file}?update=${Date.now()}`);
});
