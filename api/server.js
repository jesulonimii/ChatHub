const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: ["http://localhost:5001", "http://192.168.0.102:5001"],
        methods: ["GET", "POST"]
    }
});

const message = require('./models/message.model.js');
const user = require('./models/user.model.js');


const PORT = process.env.PORT || 5000;

let active_users = []

io.on('connection', (socket) => {

    socket.on('chatMessage', (payload) => {
        io.emit('message', message.parse(payload.username, payload.message))
    });

    socket.on('login', (data) => {

        active_users.push(data.username)
        console.log(active_users)

    });

    socket.on('logged-in', (data) => {

        socket.emit('message', message.parse('bot','Welcome to ChatHub!'));

        console.log(data)
        socket.broadcast.emit('message', message.parse('bot',`${data.username} has joined the chat!`));
    });

    socket.on('disconnect', () => {
        //io.emit('message', message.parse('bot','User left!'));
    });
})



server.listen(PORT, () => {
    console.log(`\nServer has started on port ${PORT}\nLocal:  http://localhost:${PORT}\n`);
});