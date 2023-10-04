import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Outlet } from "react-router-dom";

type SocketContext = Socket | null;

export const socketContext = createContext<SocketContext>(null);

export function SocketProvider() {
  const [socket, setSocket] = useState<SocketContext>(null);

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SOCKET_URL));
  }, []);

  return (
    <socketContext.Provider value={socket}>
      <Outlet />
    </socketContext.Provider>
  );
}
