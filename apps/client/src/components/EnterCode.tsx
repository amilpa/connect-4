import { TiTick } from "react-icons/ti";

import { io, Socket } from "socket.io-client";
import { Navigate } from "react-router-dom";

import { useRef, useState } from "react";

enum Ready {
  None,
  Full,
  NotFound,
  Ready,
}

export default function EnterCode() {
  const [ready, setReady] = useState(Ready.None);
  const [err, setErr] = useState(false);
  const gameCode = useRef("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    gameCode.current = code;
    const socket: Socket = io(import.meta.env.VITE_SOCKET_URL);
    socket.emit("join", code);
    socket.on("joined", () => {
      setReady(Ready.Ready);
      socket.disconnect();
    });
    socket.on("full", () => {
      setReady(Ready.Full);
    });
  }

  if (ready == Ready.Ready) {
    return <Navigate to="/game" state={gameCode} />;
  }

  return (
    <div className="absolute left-1/2 top-36 -translate-x-1/2">
      <h1 className="pb-4 text-2xl font-semibold text-yellow-400">
        Enter game code:
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="">
          <input
            type="text"
            name="code"
            className="border-2 border-gray-400 bg-neutral-800 py-1 pl-2 outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <button
          type="submit"
          className=" bg-gray-400 px-2 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <TiTick className="text-neutral-800" />
        </button>
      </form>
    </div>
  );
}
