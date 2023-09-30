import { createContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext<SocketIOClient.Socket>();
