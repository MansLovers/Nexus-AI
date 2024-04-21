async function nexus(m, { text, usedPrefix, command, conn }) {
  function no(number) {
    return number.replace(/\s/g, "").replace(/([@+-])/g, "");
  }
  var hl = [];
  hl[0] = text.split(".")[0];
  hl[0] = no(hl[0]) + "@s.whatsapp.net";
  hl[1] = text.split(".")[1];
  if (!text)
    return conn.reply(
      m.chat,
      `[ ! ] Cara Pemakaian Salah\nContoh: ${usedPrefix + command} @${
        m.sender.split("@")[0]
      }.30`,
      m
    );
  if (typeof db.data.users[hl[0]] == "undefined")
    throw `Pengguna Tersebut Tidak Mendaftarkan Diri Ke ${namebot}`;
  var jumlahHari = 86400000 * hl[1];
  var now = new Date() * 1;
  global.db.data.users[hl[0]].vip = true;
  if (now < global.db.data.users[hl[0]].vipDate)
    global.db.data.users[hl[0]].vipDate += jumlahHari;
  else global.db.data.users[hl[0]].vipDate = now + jumlahHari;
  conn.reply(
    m.chat,
    `[✓] Permintaan *@${hl[0].split("@")[0]}* VIP Selama *${
      hl[1]
    }* Berhasil\n\nDetail VIP: *${msToDate(
      global.db.data.users[hl[0]].vipDate - now
    )}*`,
    m
  );
  conn.reply(
    hl[0],
    `[✓] Selamat Kak *@${hl[0].split("@")[0]}* Telah Menjadi VIP User Selama *${
      hl[1]
    }* Hari\n\nDetail VIP: *${msToDate(
      global.db.data.users[hl[0]].vipDate - now
    )}*`,
    m
  );
}
nexus.help = ["addvip"].map((v) => v + " [ TAG/NUMBER ]");
nexus.tags = ["owner"];
nexus.command = /^(addvip)$/i;
nexus.rowner = true;
export default nexus;

function msToDate(ms) {
  let years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  let weeks = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
  );
  let days = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
  );
  return `${years} tahun ${months} bulan ${weeks} minggu ${days} hari`;
}
