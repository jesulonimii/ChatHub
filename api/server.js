const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "http://localhost:5001",
        methods: ["GET", "POST"]
    }
});

const message = require('./models/message.model.js');

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {

    socket.emit('message', message.parse('bot','Welcome to ChatHub!'));

    socket.broadcast.emit('message', message.parse('bot','Dave has joined the chat!'));

    socket.on('disconnect', () => {
        io.emit('message', message.parse('bot','User has left the chat'));
    });
})



server.listen(PORT, () => {
    console.log(`\nServer has started on port ${PORT}\nLocal:  http://localhost:${PORT}\n`);
});