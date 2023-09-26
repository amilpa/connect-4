const { Server } = require("socket.io");
const cors = require("cors");

const port = 3000;
const io = new Server(port, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const { v4: uuidv4 } = require("uuid");

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
    let clientsInRoom = io.sockets.adapter.rooms.get(roomName);
    if (clientsInRoom.size > 2) {
      socket.emit("full");
      return;
    } else {
      socket.join(roomName);
      socket.emit("joined", roomName);
      socket.to(roomName).emit("player-joined");
    }
  });
});

console.log(`Server is running on port ${port}`);
