async function nexus(m, { text }) {
  let users = global.db.data.users;
  var text = "";
  var i = 1;
  for (let jid in users) {
    if (users[jid].vip) {
      text += `\n\n${i}. @${jid.replace(/@.+/, "")}\n    ${msToDate(
        global.db.data.users[jid].vipDate - new Date() * 1
      )}`;
      i += 1;
    }
  }
  return m.reply(`Pengguna VIP: ${i - 1}\n${text}`);
}
nexus.help = ["listvip"];
nexus.tags = ["main"];
nexus.command = /^(listvip)$/i;
nexus.limit = true;
export default nexus;

function msToDate(ms) {
  let temp = ms;
  let years = Math.floor(temp / (365 * 24 * 60 * 60 * 1000));
  temp = temp % (365 * 24 * 60 * 60 * 1000);
  let months = Math.floor(temp / (30 * 24 * 60 * 60 * 1000));
  temp = temp % (30 * 24 * 60 * 60 * 1000);
  let weeks = Math.floor(temp / (7 * 24 * 60 * 60 * 1000));
  temp = temp % (7 * 24 * 60 * 60 * 1000);
  let days = Math.floor(temp / (24 * 60 * 60 * 1000));
  temp = temp % (24 * 60 * 60 * 1000);
  let hours = Math.floor(temp / (60 * 60 * 1000));
  temp = temp % (60 * 60 * 1000);
  let minutes = Math.floor(temp / (60 * 1000));
  temp = temp % (60 * 1000);

  let result = "";
  if (years > 0) {
    result += years + (years > 1 ? " tahun " : " tahun ");
  }
  if (months > 0) {
    result += months + (months > 1 ? " bulan " : " bulan ");
  }
  if (weeks > 0) {
    result += weeks + (weeks > 1 ? " minggu " : " minggu ");
  }
  if (days > 0) {
    result += days + (days > 1 ? " hari " : " hari ");
  }
  if (hours > 0) {
    result += hours + (hours > 1 ? " jam " : " jam ");
  }
  if (minutes > 0) {
    result += minutes + (minutes > 1 ? " menit " : " menit ");
  }
  return result.trim();
}
