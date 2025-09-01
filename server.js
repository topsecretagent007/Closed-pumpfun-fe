// server.js
import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // emit token updates
  socket.emit("newToken", { /* token data */ });
});

server.listen(4000, () => {
  console.log("Socket.IO server listening on port 4000");
});
