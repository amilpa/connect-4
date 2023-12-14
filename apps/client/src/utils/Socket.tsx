import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Socket, io } from "socket.io-client";

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
