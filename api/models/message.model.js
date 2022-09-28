const moment = require("moment");

exports.parse = (username, message) => {
    return {
        id: Math.floor(Math.random() * 10000),
        img: "https://avatars.dicebear.com/api/avataaars/" + username + ".svg",
        username: username,
        message: message,
        time: moment().format('h:mm a'),
    }
}