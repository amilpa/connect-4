import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socketContext } from "../utils/Socket";

export default function Wait() {
  const [ready, setReady] = useState(false);
  const [gameCode, setGameCode] = useState("");

  const navigate = useNavigate();

  const socket = useContext(socketContext);

  useEffect(() => {
    socket?.emit("create");
    socket?.on("joined", (roomName) => {
      setGameCode(roomName);
      return;
    });
    socket?.on("ready", () => {
      setReady(true);
    });
  }, [socket]);

  if (!ready) {
    return (
      <div className="absolute left-1/2 top-44 w-max -translate-x-1/2 rounded-lg bg-neutral-900 p-8">
        <h1 className="">Waiting for people to join...</h1>
        <h1 className="mt-4 text-center text-lg sm:text-xl">
          Room no:{" "}
          <span className="font-semibold text-yellow-400">{gameCode}</span>
        </h1>
      </div>
    );
  }
  navigate("/game", { state: { gameCode: gameCode } });
}
