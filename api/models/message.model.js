const moment = require("moment");

exports.parse = (username, message, img) => {
    return {
        id: Math.floor(Math.random() * 10000),
        img: img,
        username: username,
        message: message,
        time: moment().format('h:mm a'),
    }
}