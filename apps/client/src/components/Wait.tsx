import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import { Navigate } from "react-router-dom";

export default function Wait() {
  const [ready, setReady] = useState(false);
  const [room, setRoom] = useState("");
  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_SOCKET_URL);
    socket.emit("create");
    socket.on("joined", (roomName) => {
      setRoom(roomName);
      return;
    });
    socket.on("ready", () => {
      setReady(true);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  if (!ready) {
    return (
      <div className="absolute top-44 left-1/2 -translate-x-1/2 w-max p-8 rounded-lg bg-neutral-900">
        <h1 className="">Waiting for people to join...</h1>
        <h1 className="text-lg sm:text-xl text-center mt-4">
          Room no: <span className="font-semibold text-yellow-400">{room}</span>
        </h1>
      </div>
    );
  }

  return <Navigate to="/play" />;
}
