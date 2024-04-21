import cp, { exec as _exec } from "child_process";
import { promisify } from "util";
let exec = promisify(_exec).bind(cp);
let nexus = async (m, { conn, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return;
  m.reply(wait);
  let o;
  try {
    o = await exec(command.trimStart() + " " + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim()) m.reply(stdout);
    if (stderr.trim()) m.reply(stderr);
  }
};
nexus.customPrefix = /^[$] /;
nexus.command = new RegExp();
nexus.rowner = true;
export default nexus;
