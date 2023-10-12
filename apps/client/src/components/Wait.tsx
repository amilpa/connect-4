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

  useEffect(() => {
    if (ready) {
      navigate("/game", { state: { gameCode: gameCode } });
    }
  }, [navigate, gameCode, ready]);

  if (!ready) {
    return (
      <div className="absolute p-8 -translate-x-1/2 rounded-lg left-1/2 top-44 w-max bg-neutral-900">
        <h1 className="">Waiting for people to join...</h1>
        <h1 className="mt-4 text-lg text-center sm:text-xl">
          Room no:{" "}
          <span className="font-semibold text-yellow-400">{gameCode}</span>
        </h1>
      </div>
    );
  }
}
