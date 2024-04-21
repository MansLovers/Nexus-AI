import os from "os";
import cfonts from "cfonts";
import express from "express";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { promises as fsPromises } from "fs";
import chalk from "chalk";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(chalk.green(`🌐 Port ${port} is open`));
});

const { say } = cfonts;

say("NEXUS", { font: "tiny", align: "center", colors: ["blue"] });
say("MansTwelve", { font: "console", align: "center", colors: ["system"] });

let isRunning = false;

async function start(file) {
  if (isRunning) return;
  isRunning = true;

  const currentFilePath = new URL(import.meta.url).pathname;
  const args = [
    path.join(path.dirname(currentFilePath), file),
    ...process.argv.slice(2),
  ];
  const p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });

  p.on("message", (data) => {
    console.log(chalk.cyan(`🟢 RECEIVED ${data}`));
    switch (data) {
      case "reset":
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    console.error(chalk.red(`🛑 Exited with code: ${code}`));

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start("nexus.js");
    });
  });

  p.on("error", (err) => {
    console.error(chalk.red(`❌ Error: ${err}`));
    p.kill();
    isRunning = false;
    start("nexus.js");
  });

  const nexusFolder = path.join(path.dirname(currentFilePath), "nexus");

  fs.readdir(nexusFolder, async (err, files) => {
    if (err) {
      console.error(chalk.red(`❌ Error reading nexus folder: ${err}`));
      return;
    }
    console.log(
      chalk.yellow(`🟡 Found ${files.length} nexus in folder ${nexusFolder}`)
    );

    try {
      const { default: baileys } = await import("@adiwajshing/baileys");
      const version = (await baileys.fetchLatestBaileysVersion()).version;
      console.log(
        chalk.yellow(`🟡 Baileys library version ${version} is installed`)
      );
    } catch (e) {
      console.error(chalk.red("❌ Baileys library is not installed"));
    }
  });

  console.log(chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`));
  const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
  console.log(chalk.yellow(`💾 Total RAM: ${ramInGB.toFixed(2)} GB`));
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
  console.log(chalk.yellow(`💽 Free RAM: ${freeRamInGB.toFixed(2)} GB`));
  console.log(chalk.yellow(`📃 Script by MansTwelve`));

  const packageJsonPath = path.join(
    path.dirname(currentFilePath),
    "./package.json"
  );
  try {
    const packageJsonData = await fsPromises.readFile(packageJsonPath, "utf-8");
    const packageJsonObj = JSON.parse(packageJsonData);
    console.log(chalk.blue.bold(`\n📦 Package Information`));
    console.log(chalk.cyan(`Name: ${packageJsonObj.name}`));
    console.log(chalk.cyan(`Version: ${packageJsonObj.version}`));
    console.log(chalk.cyan(`Description: ${packageJsonObj.description}`));
    console.log(chalk.cyan(`Author: MansTwelve`));
  } catch (err) {
    console.error(chalk.red(`❌ Unable to read package.json: ${err}`));
  }

  const totalFoldersAndFiles = await getTotalFoldersAndFiles(nexusFolder);
  console.log(
    chalk.blue.bold(`\n📂 Total Folders and Files in "nexus" folder`)
  );
  console.log(chalk.cyan(`Total Folders: ${totalFoldersAndFiles.folders}`));
  console.log(chalk.cyan(`Total Files: ${totalFoldersAndFiles.files}`));

  console.log(chalk.blue.bold(`\n⏰ Current Time`));
  const currentTime = new Date().toLocaleString();
  console.log(chalk.cyan(`${currentTime}`));

  setInterval(() => {}, 1000);
}

function getTotalFoldersAndFiles(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        let folders = 0;
        let filesCount = 0;
        files.forEach((file) => {
          const filePath = path.join(folderPath, file);
          if (fs.statSync(filePath).isDirectory()) {
            folders++;
          } else {
            filesCount++;
          }
        });
        resolve({ folders, files: filesCount });
      }
    });
  });
}

start("nexus.js");

process.on("unhandledRejection", () => {
  console.error(
    chalk.red(`❌ Unhandled promise rejection. Script will restart...`)
  );
  start("nexus.js");
});

process.on("exit", (code) => {
  console.error(chalk.red(`🛑 Exited with code: ${code}`));
  console.error(chalk.red(`❌ Script will restart...`));
  start("nexus.js");
});
