import { createHash } from "crypto";

async function nexus(m) {
  let sn = createHash("md5").update(m.sender).digest("hex");
  m.reply(
    `[ ! ] Berikut Ini Adalah SN Anda\n\n${sn}\n\nCara Pemakaian\n.unreg ${sn}`
  );
}

nexus.help = ["ceksn"];
nexus.tags = ["main"];
nexus.command = /^(ceksn)$/i;
nexus.register = true;
export default nexus;
