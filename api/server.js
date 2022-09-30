const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const message = require('./models/message.model.js');
const user = require('./models/user.model.js');

const io = socket(server, {
    cors: {
        origin: ["http://localhost:5001", "http://192.168.0.102:5001"],
        methods: ["GET", "POST"]
    }
});




const PORT = process.env.PORT || 5000;

let active_users = new Map();

io.on('connection', (socket) => {

    socket.on('chatMessage', (payload) => {
        io.emit('message', message.parse(payload.username, payload.message, payload.img));
    });

    socket.on('check-username', (username) => {

        active_users.forEach((value, key) => {
            if (username.toLowerCase() === value.username.toLowerCase()) {
                socket.emit("username-taken", {username: username, taken: true});
            }
            else {
                socket.emit("username-taken", {username: username, taken: false});
            }
        })


    });

    socket.on('logged-in', (data) => {

        socket.emit('message', message.parse('bot','Welcome to ChatHub!'));

        active_users.set(socket.id, user.details(socket.id, data.username))

        console.log(active_users);

        io.emit('active-users', active_users);
        socket.broadcast.emit('message', message.parse('bot',`${data.username} has joined the chat!`));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
        let details = {}

        if(active_users.has(socket.id)){
            details = active_users.get(socket.id)
        }

        if (details.username) {
            io.emit('message', message.parse('bot',`${details.username} left!`, 'sad') );
            active_users.delete(socket.id);
        }

    });
})




server.listen(PORT, () => {
    console.log(`\nServer has started on port ${PORT}\nLocal:  http://localhost:${PORT}\n`);
});