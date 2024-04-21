import * as os from "os";
import fs from "fs";
import path from "path";

let nexus = async (m, { usedPrefix, command, text, __dirname }) => {
  if (!text)
    return m.reply(
      `Save Dimana?\nContoh: ${usedPrefix + command} DOWNLOAD/download-play`
    );
  if (!m.quoted?.text) return m.reply(`balas pesan nya!`);
  let dir = path.join(
    __dirname,
    /\.[a-zA-Z0-9]+$/.test(text) ? `./../${text}` : `./${text}.js`
  );
  try {
    let anu = fs.existsSync(dir);
    await fs.writeFileSync(dir, m.quoted.text);
    if (anu)
      m.reply(
        `saved in '${dir.replace(
          __dirname,
          `${os.platform() == "win32" ? "\\" : "/"}nexus`
        )}'`
      );
    else m.reply(`*[New File Created]*\n\nsaved in '${dir}'`);
  } catch (e) {
    console.log(e);
    m.reply(`Error: ENOENT: no such file or directory, open '${dir}'`);
  }
};

nexus.help = ["savenexus"].map((v) => v + " [ NAMAFILE ]");
nexus.tags = ["owner"];
nexus.command = /^(save)(n(ex)?|(n(exus)?))$/i;
nexus.rowner = true;

export default nexus;
