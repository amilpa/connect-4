import { TiTick } from "react-icons/ti";

import { useNavigate } from "react-router-dom";

import { useEffect, useRef, useState, useContext } from "react";
import { socketContext } from "../utils/Socket";

enum Ready {
  None,
  Full,
  NotFound,
  Ready,
}

export default function EnterCode() {
  const [ready, setReady] = useState(Ready.None);
  const gameCode = useRef("");
  const navigate = useNavigate();
  const socket = useContext(socketContext);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    gameCode.current = code;
    socket?.emit("join", code);
    socket?.on("joined", () => {
      setReady(Ready.Ready);
    });
    socket?.on("full", () => {
      setReady(Ready.Full);
    });
    socket?.on("not-found", () => {
      setReady(Ready.NotFound);
    });
  }

  useEffect(() => {
    if (ready == Ready.Ready)
      navigate("/game", { state: { gameCode: gameCode.current } });
  }, [ready, navigate]);

  return (
    <div className="absolute -translate-x-1/2 left-1/2 top-36">
      <h1 className="pb-4 text-2xl font-semibold text-yellow-400">
        Enter game code:
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="">
          <input
            type="text"
            name="code"
            className="py-1 pl-2 border-2 border-gray-400 outline-none bg-neutral-800 focus:ring-2 focus:ring-red-400"
          />
        </div>
        <button
          type="submit"
          className="px-2 bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          <TiTick className="text-neutral-800" />
        </button>
      </form>
      {ready == Ready.Full && (
        <p className="mt-2 font-semibold text-red-400">Game is full</p>
      )}
      {ready == Ready.NotFound && (
        <p className="mt-2 font-semibold text-red-400">Room not found</p>
      )}
    </div>
  );
}
