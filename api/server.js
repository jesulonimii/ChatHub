const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('New client connected');


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}



server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}\nLocal:  http://localhost:${PORT}`);
});