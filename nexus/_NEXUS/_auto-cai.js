import axios from "axios";

let nexus = (m) => m;

nexus.before = async (m) => {
  let chat = global.db.data.chats[m.chat];
  if (chat.cai && !chat.isBanned) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
    if (!m.text) return;

    let textToSend;
    let userID = m.sender;
    let externalId = global.db.data.users[userID]?.karakter;
    if (!externalId) {
      throw "Silahkan Set Karakter Terlebih Dahulu!!";
    }
    try {
      let res = await cai(m.text, externalId); // Pass m.text as text parameter
      if (res.status && res.result.replies.length > 0) {
        await m.reply(res.result.replies[0].text);
      } else {
        throw "Tidak Ada Respon Dari Karakter";
      }
    } catch (e) {
      console.error(e);
      await m.reply(e);
    }
    return;
  }
};

export default nexus;

async function cai(text, externalId) {
  try {
    const response = await axios.post(
      "https://apigratis.site/api/send_message",
      {
        external_id: externalId,
        message: text
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}
