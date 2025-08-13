module.exports.config = {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "1.0.2",
    credits: "ЁЭРмЁЭРбЁЭРмЁЭРбЁЭРЪЁЭРЭЁЭРЪЁЭРн ЁЭРЬЁЭРбЁЭРЪЁЭРн ЁЭРЫЁЭРиЁЭРн",
    description: "Send goodbye message with profile picture or video if bot leaves",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "axios": ""
    }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const cachePath = join(__dirname, "cache", "leaveFiles");
    if (!existsSync(cachePath)) mkdirSync(cachePath, { recursive: true });
};

module.exports.run = async function({ api, event, Users }) {
    const axios = global.nodemodule["axios"];
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];

    // ржпржжрж┐ ржмржЯ ржирж┐ржЬрзЗ ржЧрзНрж░рзБржк ржЫрж╛рзЬрзЗ тЖТ ржнрж┐ржбрж┐ржУ ржкрж╛ржарж╛ржУ
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        const videoPath = path.join(__dirname, "cache", "leaveFiles", "botLeave.mp4");

        // ржПржЦрж╛ржирзЗ рждрзБржорж┐ ржирж┐ржЬрзЗрж░ ржнрж┐ржбрж┐ржУ ржлрж╛ржЗрж▓ рж░рзЗржЦрзЗ ржжрж┐рждрзЗ ржкрж╛рж░рзЛ ржмрж╛ URL ржерзЗржХрзЗ ржбрж╛ржЙржирж▓рзЛржб ржХрж░рждрзЗ ржкрж╛рж░рзЛ
        // ржпржжрж┐ ржнрж┐ржбрж┐ржУ рж▓рзЛржХрж╛рж▓рж┐ ржерж╛ржХрзЗ рждрж╛рж╣рж▓рзЗ рж╕рж░рж╛рж╕рж░рж┐ ржкрж╛ржарж╛ржирзЛ рж╣ржмрзЗ
        if (fs.existsSync(videoPath)) {
            return api.sendMessage({
                body: "ржмрж┐ржжрж╛ржпрж╝ рж╕ржмрж╛ржЗржХрзЗ ЁЯШв",
                attachment: fs.createReadStream(videoPath)
            }, event.threadID);
        } else {
            return api.sendMessage("ржмржЯ ржмрзЗрж░ рж╣рзЯрзЗ ржЧрзЗржЫрзЗ, ржХрж┐ржирзНрждрзБ ржнрж┐ржбрж┐ржУ ржлрж╛ржЗрж▓ ржкрж╛ржУрзЯрж╛ ржпрж╛рзЯржирж┐!", event.threadID);
        }
    }

    // ржЕржирзНржп ржХрзЗржЙ ржмрзЗрж░ рж╣рж▓рзЗ тЖТ ржирж╛ржо + ржкрзНрж░рзЛржлрж╛ржЗрж▓ ржкрж┐ржХржЪрж╛рж░
    const name = await Users.getNameUser(event.logMessageData.leftParticipantFbId);

    const imgPath = path.join(__dirname, "cache", "leaveFiles", `${event.logMessageData.leftParticipantFbId}.jpg`);
    let url = `https://graph.facebook.com/${event.logMessageData.leftParticipantFbId}/picture?width=512&height=512&access_token=${api.getAppState().access_token}`;
    let getImage = (await axios.get(url, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(imgPath, Buffer.from(getImage, "binary"));

    const msg = {
        body: `ржнрж╛рж▓рзЛ ржерж╛ржХржмрзЗ ржкрзНрж░рж┐ржпрж╝ ${name}, ржЖржмрж╛рж░ ржжрзЗржЦрж╛ рж╣ржмрзЗ тЭдя╕П`,
        attachment: fs.createReadStream(imgPath)
    };

    api.sendMessage(msg, event.threadID, () => fs.unlinkSync(imgPath));
};