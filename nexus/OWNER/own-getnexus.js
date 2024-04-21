import fs from "fs";
import path from "path";

let nexus = async (m, { text, __dirname }) => {
  if (!text) {
    let listItems = fs
      .readdirSync(path.join(__dirname), { withFileTypes: true })
      .map((item) =>
        item.isDirectory() ? `*[Folder]* ${item.name}` : `*[File]* ${item.name}`
      );
    return m.reply(
      `Daftar folder dan file dalam 'nexus':\n${listItems.join("\n")}`
    );
  }
  let itemPath = path.join(__dirname, text);
  if (!fs.existsSync(itemPath)) {
    return m.reply(`'${text}' tidak ditemukan di dalam 'nexus'`);
  }
  if (fs.statSync(itemPath).isDirectory()) {
    let listFiles = fs
      .readdirSync(itemPath)
      .filter((file) => file.endsWith(".js"))
      .map((file) => `*[File]* ${file}`);
    if (listFiles.length === 0) {
      return m.reply(`Tidak ada file JavaScript (.js) dalam folder '${text}'`);
    }
    return m.reply(
      `Daftar file dalam folder '${text}':\n${listFiles.join("\n")}`
    );
  } else if (text.endsWith(".js")) {
    let fileContent = fs.readFileSync(itemPath, "utf8");
    return m.reply(`${fileContent}`);
  } else {
    return m.reply(
      `'${text}' bukan folder dan bukan file JavaScript (.js) di dalam 'nexus'`
    );
  }
};

nexus.help = ["getnexus"].map((v) => v + " [ NAMAFILE ]");
nexus.tags = ["owner"];
nexus.command = /^(gn|getnexus|nex|getnex)$/i;
nexus.rowner = true;

export default nexus;
