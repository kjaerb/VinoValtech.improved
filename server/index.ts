const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

interface User {
  id: string;
  roomId: string;
  name: string;
  connected: boolean;
  joined: boolean;
}

interface TastingRoom {
  roomId: string;
  users: User[];
}

let user: User;

io.on("connection", (socket) => {
  socket.on("join-room", (joinedUser: User, cb) => {
    user = joinedUser;
    socket.join(joinedUser.roomId);
    console.log(`${joinedUser.name} joined ${joinedUser.roomId}`);
    cb(`Joined room ${joinedUser.roomId}`);
  });

  socket.on("disconnect", () => {
    console.log(`${user.name} disconnected`);
  });
});
