let nexus = async (m, { conn, args }) => {
  const menu = global.db.data.settings[conn.user.jid];
  const steil = await style(
    `\`SetMenu:\`
- 1. image
- 2. gif
- 3. teks
- 4. document
    
\`SetWelcome:\`
- 1. gcImage
- 2. gcGif
- 3. gcTeks
- 4. gcDoc`,
    1
  );
  let type = (args[0] || "").toLowerCase();
  switch (type) {
    case "image":
      menu.image = true;
      menu.gif = false;
      menu.teks = false;
      menu.doc = false;
      m.reply(`[✓] Permintaan Setmenu Image Berhasil`);
      break;
    case "gif":
      menu.image = false;
      menu.gif = true;
      menu.teks = false;
      menu.doc = false;
      m.reply(`[✓] Permintaan Setmenu Gif Berhasil`);
      break;
    case "teks":
      menu.image = false;
      menu.gif = false;
      menu.teks = true;
      menu.doc = false;
      m.reply(`[✓] Permintaan Setmenu Teks Berhasil`);
      break;
    case "doc":
    case "document":
      menu.image = false;
      menu.gif = false;
      menu.teks = false;
      menu.doc = true;
      m.reply(`[✓] Permintaan Setmenu Document Berhasil`);
      break;
    case "gcimage":
    case "gcimg":
      menu.gcImg = true;
      menu.gcGif = false;
      menu.gcTeks = false;
      menu.gcDoc = false;
      m.reply(`[✓] Permintaan Setwelcome Image Berhasil`);
      break;
    case "gcgif":
      menu.gcImg = false;
      menu.gcGif = true;
      menu.gcTeks = false;
      menu.gcDoc = false;
      m.reply(`[✓] Permintaan Setwelcome Gif Berhasil`);
      break;
    case "gcteks":
      menu.gcImg = false;
      menu.gcGif = false;
      menu.gcTeks = true;
      menu.gcDoc = false;
      m.reply(`[✓] Permintaan Setwelcome Teks Berhasil`);
      break;
    case "gcdoc":
    case "gcdocument":
      menu.gcImg = false;
      menu.gcGif = false;
      menu.gcTeks = false;
      menu.gcDoc = true;
      m.reply(`[✓] Permintaan Setwelcome Document Berhasil`);
      break;
    default:
      return await m.reply(steil);
  }
};
nexus.help = ["setemplate"].map((v) => v + " [ OPTION ]");
nexus.tags = ["owner"];
nexus.command = /^(setemplate)$/i;
nexus.rowner = true;

export default nexus;
