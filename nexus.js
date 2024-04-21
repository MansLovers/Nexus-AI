process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
``;
import "./Ventures.js";

import path, { join } from "path";
import { platform } from "process";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module";
global.__filename = function filename(
  pathURL = import.meta.url,
  rmPrefix = platform !== "win32"
) {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString();
};
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
};
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

import * as ws from "ws";
import chokidar from "chokidar";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch,
} from "fs";
import yargs from "yargs";
import { spawn } from "child_process";
import lodash from "lodash";
import syntaxerror from "syntax-error";
import { tmpdir } from "os";
import os from "os";
import Pino from "pino";
import { format } from "util";
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low } from "lowdb";
import fs from "fs";
import { JSONFile } from "lowdb/node";
import storeSys from "./lib/store2.js";
const store = storeSys.makeInMemoryStore();
const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  proto,
  jidNormalizedUser,
  PHONENUMBER_MCC,
  Browsers,
} = await (
  await import("@adiwajshing/baileys")
).default;

import readline from "readline";
import { parsePhoneNumber } from "libphonenumber-js";

const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));
import NodeCache from "node-cache";
const msgRetryCounterCache = new NodeCache();
const msgRetryCounterMap = (MessageRetryMap) => {};
const { version } = await fetchLatestBaileysVersion();

protoType();
serialize();

global.API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]:
                  global.APIKeys[
                    name in global.APIs ? global.APIs[name] : name
                  ],
              }
            : {}),
        })
      )
    : "");
global.timestamp = {
  start: new Date(),
};

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(
  yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.prefix = new RegExp(
  "^[" +
    (opts["prefix"] || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      "\\$&"
    ) +
    "]"
);

global.db = new Low(
  /https?:\/\//.test(opts["db"] || "")
    ? new cloudDBAdapter(opts["db"])
    : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`)
);

global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ)
    return new Promise((resolve) =>
      setInterval(async function () {
        if (!global.db.READ) {
          clearInterval(this);
          resolve(
            global.db.data == null
              ? await global.loadDatabase()
              : global.db.data
          );
        }
      }, 1 * 1000)
    );
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    menfess: {},
    simulator: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();

global.authFolder = storeSys.fixFileName(`${opts._[0] || ""}sessions`);
let { state, saveCreds } = await useMultiFileAuthState(
  path.resolve("./sessions")
);

const connectionOptions = {
  pairingCode: true,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.templateMessage ||
      message.listMessage
    );
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      };
    }
    return message;
  },
  msgRetryCounterMap,
  logger: Pino({
    level: "fatal",
  }),
  auth: state,
  browser: ["ubuntu", "chrome", "20.0.04"],
  version,
  getMessage: async (key) => {
    let jid = jidNormalizedUser(key.remoteJid);
    let msg = await store.loadMessage(jid, key.id);
    return msg?.message || "";
  },
  msgRetryCounterCache,
  connectTimeoutMs: 60000,
  defaultQueryTimeoutMs: 0,
  keepAliveIntervalMs: 10000,
  emitOwnEvents: true,
  fireInitQueries: true,
  generateHighQualityLinkPreview: true,
  syncFullHistory: true,
  markOnlineOnConnect: true,
};

global.conn = makeWASocket(connectionOptions);
conn.isInit = false;
global.pairingCode = true;

if (global.pairingCode && !conn.authState.creds.registered) {
  let phoneNumber;
  if (!!global.pairingNumber) {
    phoneNumber = global.pairingNumber.replace(/[^0-9]/g, "");

    if (!Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(
          chalk.redBright(
            "Start with your country's WhatsApp code, Example : 62xxx"
          )
        )
      );
      process.exit(0);
    }
  } else {
    phoneNumber = await question(
      chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
    );
    phoneNumber = phoneNumber.replace(/[^0-9]/g, "");

    // Ask again when entering the wrong number
    if (!Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(
          chalk.redBright(
            "Start with your country's WhatsApp code, Example : 62xxx"
          )
        )
      );

      phoneNumber = await question(
        chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
      );
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
      rl.close();
    }
  }

  setTimeout(async () => {
    let code = await conn.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join("-") || code;
    console.log(
      chalk.yellow(chalk.bgGreen(`Your Pairing Code : `)),
      chalk.black(chalk.white(code))
    );
  }, 3000);
}

if (!opts["test"]) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write().catch(console.error);
      // if (opts['autocleartmp'] && (global.support || {}).find)(tmp = [os.tmpdir(), 'tmp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
      clearTmp();
    }, 30 * 1000);
  }
}

if (opts["server"]) (await import("./server.js")).default(global.conn, PORT);

const directory = "./sessions";
function deleteFilesExceptOne(directory, fileNameToKeep) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Terjadi kesalahan:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (file !== fileNameToKeep) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Gagal menghapus file ${file}:`, err);
          } else {
            console.log(`File ${file} berhasil dihapus.`);
          }
        });
      }
    });
  });
}

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, "./tmp")];
  const filename = [];
  tmp.forEach((dirname) =>
    readdirSync(dirname).forEach((file) => filename.push(join(dirname, file)))
  );
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && Date.now() - stats.mtimeMs >= 5 * 60 * 1000)
      return unlinkSync(file);
    return false;
  });
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update;
  global.stopped = connection;

  if (isNewLogin) conn.isInit = true;
  const code =
    lastDisconnect?.error?.output?.statusCode ||
    lastDisconnect?.error?.output?.payload?.statusCode;
  if (
    code &&
    code !== DisconnectReason.loggedOut &&
    conn?.ws.readyState !== ws.default.CONNECTING
  ) {
    console.log(await global.reloadnexusfile(true).catch(console.error));
    global.timestamp.connect = new Date();
  }
  if (global.db.data == null) loadDatabase();
  if (connection === "open") {
    console.log(chalk.yellow("Bot Aktif"));
  }
  if (connection == "close") {
    console.log(chalk.yellow(`Bot Nonaktif`));
  }
}

process.on("unhandledRejection", (reason, p) => {
  console.log(" [AntiCrash] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", () => {
  null;
});
let isInit = true;
let nexusfile = await import("./Lexus.js");
global.reloadnexusfile = async function (restatConn) {
  try {
    const nexusfile = await import(`./Lexus.js?update=${Date.now()}`).catch(
      console.error
    );
    if (Object.keys(nexusfile || {}).length) nexusfile = nexusfile;
  } catch (error) {
    console.error;
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {
      chats: oldChats,
    });
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.nexusfile);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("messages.update", conn.pollUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    //  conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  conn.welcome = "Welcome to @subject, @user\n";
  conn.bye = "Goodbye @user 👋";
  conn.spromote = "@user *Promote* to Admin ";
  conn.sdemote = "@user *Demote* from Admin";
  conn.sDesc = "Description Has Been Changed To \n@desc";
  conn.sSubject = "Group Name Has Been Changed To \n@subject";
  conn.sIcon = "Group Photo Has Been Changed!";
  conn.sRevoke = "Group Link Has Been Changed To \n@revoke";
  conn.sAnnounceOn =
    "The group has been closed!\now only admins can send messages.";
  conn.sAnnounceOff =
    "The group is open!\nNow all participants can send messages.";
  conn.sRestrictOn = "Edit Group Info changed to admin only!";
  conn.sRestrictOff = "Edit Group Info changed to all participants!";

  conn.nexusfile = nexusfile.nexusfile.bind(global.conn);
  conn.participantsUpdate = nexusfile.participantsUpdate.bind(global.conn);
  conn.pollUpdate = nexusfile.pollUpdate.bind(global.conn);
  // conn.groupsUpdate = nexusfile.groupsUpdate.bind(global.conn)
  // conn.onDelete = nexusfile.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn);

  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith("@g.us") && chat.isChats)
      .map((v) => v[0]);
  } else {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith("@g.us") && chat.isChats)
      .map((v) => v[0]);
  }

  conn.ev.on("messages.upsert", conn.nexusfile);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("messages.update", conn.pollUpdate);
  // conn.ev.on('groups.update', conn.groupsUpdate)
  // conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};

global.nexus = {};
const nexusFilter = (filename) => /\.js$/.test(filename);

const require = createRequire(import.meta.url);
const glob = require("glob");

async function filesInit() {
  try {
    const nexusDirectory = path.join(__dirname, "nexus");
    const pattern = path.join(nexusDirectory, "**/*.js");
    const CommandsFiles = getJSFiles(pattern);
    const successMessages = [];
    const errorMessages = [];

    for (let file of CommandsFiles) {
      const moduleName = "/" + path.relative(__dirname, file);
      try {
        const module = await import(file);
        global.nexus[moduleName] = module.default || module;
        successMessages.push(moduleName);
      } catch (e) {
        conn.logger.error(e);
        delete global.nexus[moduleName];
        errorMessages.push(moduleName);
      }
    }

    conn.logger.warn("Loaded " + CommandsFiles.length + " JS Files total.");
    conn.logger.info(
      "✅ Success nexus:\n" + successMessages.length + " total."
    );
    conn.logger.error("❌ Error nexus:\n" + errorMessages.length + " total");
  } catch (e) {
    conn.logger.error(e);
  }
}

filesInit().catch(console.error);

function getJSFiles(pattern) {
  return glob.sync(pattern);
}

function FileEv(type, file) {
  const filename = async (file) => file.replace(/^.*[\\\/]/, "");
  console.log(file);
  switch (type) {
    case "delete":
      return delete global.nexus[file];
      break;
    case "change":
      try {
        (async () => {
          const module = await import(
            `${global.__filename(file)}?update=${Date.now()}`
          );
          global.nexus[file] = module.default || module;
        })();
      } catch (e) {
        conn.logger.error(
          `error require nexus '${filename(file)}\n${format(e)}'`
        );
      } finally {
        global.nexus = Object.fromEntries(
          Object.entries(global.nexus).sort(([a], [b]) => a.localeCompare(b))
        );
      }
      break;
    case "add":
      try {
        (async () => {
          const module = await import(
            `${global.__filename(file)}?update=${Date.now()}`
          );
          global.nexus[file] = module.default || module;
        })();
      } catch (e) {
        conn.logger.error(
          `error require nexus '${filename(file)}\n${format(e)}'`
        );
      } finally {
        global.nexus = Object.fromEntries(
          Object.entries(global.nexus).sort(([a], [b]) => a.localeCompare(b))
        );
      }
      break;
  }
}

function watchFiles() {
  let watcher = chokidar.watch("nexus/**/*.js", {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true,
    alwaysState: true,
  });
  const nexusFilter = (filename) => /\.js$/.test(filename);
  watcher
    .on("add", (path) => {
      conn.logger.info(`new nexus - '${path}'`);
      return FileEv("add", `./${path}`);
    })
    .on("change", (path) => {
      conn.logger.info(`updated nexus - '${path}'`);
      return FileEv("change", `./${path}`);
    })
    .on("unlink", (path) => {
      conn.logger.warn(`deleted nexus - '${path}'`);
      return FileEv("delete", `./${path}`);
    });
}
watchFiles();
await global.reloadnexusfile();

/* QuickTest */
async function _quickTest() {
  const test = await Promise.all(
    [
      spawn("ffmpeg"),
      spawn("ffprobe"),
      spawn("ffmpeg", [
        "-hide_banner",
        "-loglevel",
        "error",
        "-filter_complex",
        "color",
        "-frames:v",
        "1",
        "-f",
        "webp",
        "-",
      ]),
      spawn("convert"),
      spawn("magick"),
      spawn("gm"),
      spawn("find", ["--version"]),
    ].map((p) => {
      return Promise.race([
        new Promise((resolve) => {
          p.on("close", (code) => {
            resolve(code !== 127);
          });
        }),
        new Promise((resolve) => {
          p.on("error", (_) => resolve(false));
        }),
      ]);
    })
  );
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  });
  Object.freeze(global.support);
}

setInterval(async () => {
  if (stopped === "close" || !conn || !conn.user) return;
  await deleteFilesExceptOne(directory, "creds.json");
  conn.reply(Tio + "@s.whatsapp.net", "Sessions telah dibersihkan", null) >
    console.log(
      chalk.cyanBright(
        `\n╭───────────────────·»\n│\n` +
          `│  Sessions clear Successfull \n│\n` +
          `╰───❲ ${global.namebot} ❳\n`
      )
    );
}, 120 * 60 * 1000); // 2 jam sekali

setInterval(async () => {
  if (stopped === "close" || !conn || !conn.user) return;
  await clearTmp();
  console.log(
    chalk.cyanBright(
      `\n╭───────────────────·»\n│\n` +
        `│  Storage Setting Successful \n│\n` +
        `╰───❲ ${global.namebot} ❳\n`
    )
  );
}, 60 * 60 * 1000); // 1 jam sekali

function clockString(ms) {
  const d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  const h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [d, " Day ", h, " hours ", m, " Minutes ", s, " Second "]
    .map((v) => v.toString().padStart(2, "0"))
    .join("");
}

_quickTest().catch(console.error);
