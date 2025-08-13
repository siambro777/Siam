module.exports.config = {
  'name': "info2",
  'version': "1.0.1",
  'hasPermssion': 0,
  'credits': "Ialamick Chat",
  'description': "Admin and Bot info.",
  'commandCategory': "...",
  'cooldowns': 1,
  'dependencies': {
    'request': '',
    'fs-extra': '',
    'axios': ''
  }
};

module.exports.run = async function ({
  api: api,
  event: event,
  args: args,
  client: client,
  Users: Users,
  Threads: Threads,
  __GLOBAL: __GLOBAL,
  Currencies: Currencies
}) {
  const request = global.nodemodule.request;
  const fs = global.nodemodule["fs-extra"];
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor(uptime % 3600 / 60);
  const seconds = Math.floor(uptime % 60);
  const moment = require("moment-timezone");
  
  var timeNow = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【hh:mm:ss】");
  var imageUrls = [
    "https://i.imgur.com/Oalh2ww.jpeg", 
    "https://i.imgur.com/Oalh2ww.jpeg", 
    "https://i.imgur.com/rPgEzh8.jpeg", 
    "https://i.imgur.com/rPgEzh8.jpeg"
  ];
  
  var sendMessage = () => api.sendMessage({
    'body': `•—»✨𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧✨🌺
•┄┅═════❁🌺❁═════┅┄•

𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : 𝗦𝗵𝗮𝗵𝗮𝗱𝗮𝘁 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁

𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 : SHAHADAT

𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 : Shahadat Hosen

•┄┅══❁CONCATET❁══┅┄• 
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐈𝐝: https://www.facebook.com/61572299956804

𝐌𝐞𝐬𝐬𝐞𝐧𝐠𝐞𝐫: https://m.me/61572299956804

𝐖𝐏 𝐍𝐮𝐦𝐞𝐫 : 0189xxxxxxx

𝐒𝐞𝐚𝐫𝐜𝐡 𝐆𝐨𝐨𝐠𝐥𝐞 : আমাকে Google এ সার্চ করার কিছু নেই 🐸

•┄┅═════❁🌺❁═════┅┄•
🌺✨𝐎𝐭𝐡𝐞𝐫𝐬 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧✨🌺
 •┄┅═════❁🌺❁═════┅┄•

𝗧𝗬𝗣𝗘 /𝗮𝗱𝗺𝗶𝗻

𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 : ${global.config.PREFIX}

𝐁𝐨𝐭 𝐎𝐰𝐧𝐞𝐫 : SHAHADATッ

•—»✨ 𝐔𝐩𝐭𝐢𝐦𝐞

𝐓𝐨𝐝𝐚𝐲 𝐈𝐬 𝐓𝐢𝐦𝐞 : ${timeNow} 

𝐁𝐨𝐭 𝐈𝐬 𝐑𝐮𝐧𝐧𝐢𝐧𝐠 ${hours}:${minutes}:${seconds}.

𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠  ༄🌺
｢😘｣${global.config.BOTNAME}｢😍｣`,
    'attachment': fs.createReadStream(__dirname + "/cache/juswa.jpg")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"));
  
  return request(encodeURI(imageUrls[Math.floor(Math.random() * imageUrls.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg"))
    .on("close", () => sendMessage());
};