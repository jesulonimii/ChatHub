const moment = require("moment");

exports.parse = (username, message) => {
    return {
        username: username,
        message: message,
        time: moment().format('h:mm a'),
    }
}