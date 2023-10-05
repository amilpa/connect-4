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
  socket.on("loaded", () => {
    const roomName = getRoomName(socket);
    const roomInfo = roomData.get(roomName);
    if (roomInfo) {
      roomInfo.eventCount++;
      console.log(roomInfo.eventCount, roomInfo.totalClients);

      if (roomInfo.eventCount === roomInfo.totalClients) {
        const color = Math.random() > 0.5 ? "red" : "yellow";
      }
    }
  });
});

function getRoomName(socket) {
  const rooms = socket.rooms.keys();
  return rooms.next().value;
}

console.log(`Server is running on port ${port}`);
