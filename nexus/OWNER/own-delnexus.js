import { readdirSync, statSync, unlinkSync } from "fs";
import path from "path";

let nexus = async (m, { conn, usedPrefix: _p, __dirname, text }) => {
  const getAllFiles = (dir, filesList = []) => {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        getAllFiles(filePath, filesList);
      } else {
        filesList.push(filePath);
      }
    }
    return filesList;
  };

  const nexusFolderPath = path.join(__dirname, "../nexus");
  const files = getAllFiles(nexusFolderPath);
  const filenames = files.map((file) => path.basename(file, ".js"));

  if (!text)
    return m.reply(
      `File mana yang ingin kamu hapus?\n\nNote: Lagsung masukan saja nama file yang ingin di hapus dan tidak perlu menggunakan format .js\n\nBenar: ${_p}delnex tes\nSalah: ${_p}delnex others/tes`
    );
  if (!filenames.includes(text))
    return m.reply(
      `File '${text}.js' tidak ditemukan dalam folder 'nexus' maupun di dalam subfolder 'nexus'.`
    );

  const filename = text + ".js";
  const fileToDelete = files.find((file) => path.basename(file) === filename);

  if (!fileToDelete) {
    return m.reply(
      `File '${filename}' tidak ditemukan dalam folder 'nexus' maupun di dalam subfolder 'nexus'.`
    );
  }

  unlinkSync(fileToDelete);
  conn.reply(
    m.chat,
    `Berhasil menghapus file "${filename}" di dalam folder 'nexus' maupun di dalam subfolder 'nexus'.`,
    m
  );
};

nexus.help = ["delnex"].map((v) => v + " [ NAMAFILE ]");
nexus.tags = ["owner"];
nexus.command = /^(delnex|delnexus|dn)$/i;
nexus.rowner = true;

export default nexus;
