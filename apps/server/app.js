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
      let assignedColors = new Map();
      roomData.set(roomName, {
        ready: 1,
        assignedColors: assignedColors,
        boardData: null,
      });
    } else {
      roomData.get(roomName).ready = 2;
      const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
      if (!clientsInRoom) return;
      let colors = ["red", "yellow"];
      let assignedColors = roomData.get(roomName).assignedColors;
      for (const clientId of clientsInRoom) {
        if (!assignedColors.has(clientId)) {
          let randomIndex = Math.floor(Math.random() * colors.length);
          let randomColor = colors[randomIndex];
          assignedColors.set(clientId, randomColor);
          colors.splice(randomIndex, 1); // remove assigned color from colors array
        }
      }
      for (const clientId of clientsInRoom) {
        const clientSocket = io.sockets.sockets.get(clientId);
        console.log(
          `Sending color ${assignedColors.get(clientId)} to ${clientId}`
        );
        clientSocket.emit("start", assignedColors.get(clientId));
      }
    }
    socket.on("move_client", ({ row, col, color: playerTurn }) => {
      const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
      for (const clientId of clientsInRoom) {
        if (clientId !== socket.id) {
          const clientSocket = io.sockets.sockets.get(clientId);
          clientSocket.emit("move", { row, col, color: playerTurn });
        }
      }
    });
  });
});

console.log(`Server is running on port ${port}`);
