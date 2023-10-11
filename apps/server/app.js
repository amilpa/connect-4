const { Server } = require("socket.io");
const cors = require("cors");

const port = 3000;
const io = new Server(port, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const { v4: uuidv4 } = require("uuid");

const roomData = new Map();

io.on("connection", (socket) => {
  socket.on("create", () => {
    const roomName = uuidv4().slice(0, 4).toUpperCase();
    socket.join(roomName);
    socket.emit("joined", roomName);
    let clientsInRoom = io.sockets.adapter.rooms.get(roomName);
    if (clientsInRoom.size > 2) {
      socket.emit("ready");
      return;
    }
  });
  socket.on("join", (roomName) => {
    let rooms = io.sockets.adapter.rooms;
    if (!rooms.has(roomName)) {
      socket.emit("not-found");
      return;
    }
    socket.join(roomName);
    let clientsInRoom = io.sockets.adapter.rooms.get(roomName);
    if (clientsInRoom.size > 2) {
      socket.emit("full");
      socket.leave(roomName);
      return;
    } else {
      socket.emit("joined");
      socket.to(roomName).emit("ready", roomName);
    }
  });
  socket.on("loaded", (roomName) => {
    //add to roomInfo
    if (!roomData.has(roomName)) {
      roomData.set(roomName, {
        ready: 1,
      });
    } else {
      roomData.get(roomName).ready = 2;
      const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
      let colors = ["red", "yellow"];
      for (const clientId of clientsInRoom) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        const clientSocket = io.sockets.sockets.get(clientId);
        clientSocket.emit("color", randomColor);
      }
    }
  });
});

console.log(`Server is running on port ${port}`);
