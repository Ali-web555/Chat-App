const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
//    4.4k (gzipped: 1.9k)

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:3000", "http://192.168.43.146:3000"],
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) =>{
    console.log(`User connected: ${socket.id}`);
    socket.on('join_room', (data) =>{
        socket.join(data)
        console.log(`User with Id: ${socket.id} Joined room: ${data}`);
    });
    socket.on("send_message", (data) =>{
        // console.log(data.message);
        socket.to(data.room).emit("receive_message", data);
        // socket.emit("receive_message", data);
    });
    socket.on("disconnect", () =>{
        console.log("User disconnected", socket.id);
    });
})

server.listen(3001, () =>{
    console.log("SERVER RUNNING");
});