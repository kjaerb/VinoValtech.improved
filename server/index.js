var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});
io.on("connection", function (socket) {
    socket.on("join-room", function (user, cb) {
        socket.join(user.roomId);
        console.log("".concat(user.name, " joined ").concat(user.roomId));
        cb("Joined room ".concat(user.roomId));
    });
    socket.on("disconnect", function () {
        console.log("".concat(socket.id, " disconnected"));
    });
});
