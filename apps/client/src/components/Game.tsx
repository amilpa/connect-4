import { useRef, useState, useContext, useEffect } from "react";
import { socketContext } from "../utils/Socket";

import { checkForWin } from "../functions/checkForWin";

import { AiFillStar } from "react-icons/ai";

export default function Game() {
  const socket = useContext(socketContext);
  const numRows = 6;
  const numCols = 7;
  const [board, setBoard] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(null)),
  );
  const myColor = useRef(null);
  const [playerTurn, setPlayerTurn] = useState<string>("red");
  const [winner, setWinner] = useState<string>("");

  useEffect(() => {
    socket?.emit("loaded");
  }, [socket]);

  const handleClick = (col: number) => {
    if (winner) return;
    const row = getNextOpenRow(col);
    if (row === null) return; // Column is full

    const newBoard = [...board];
    newBoard[row][col] = playerTurn;
    console.log(newBoard);
    setBoard(newBoard);

    if (checkForWin(numRows, numCols, playerTurn, board, row, col)) {
      setWinner(playerTurn);
    } else {
      setPlayerTurn(playerTurn === "red" ? "yellow" : "red");
    }
  };

  const getNextOpenRow = (col: number) => {
    for (let row = numRows - 1; row >= 0; row--) {
      if (!board[row][col]) {
        return row;
      }
    }
    return null; // Column is full
  };

  const resetGame = () => {
    setBoard(Array.from({ length: numRows }, () => Array(numCols).fill(null)));
    setPlayerTurn("red");
    setWinner("");
  };

  return (
    <div className="min-h-screen">
      <h1 className="pb-4 pt-8 text-center text-2xl font-bold text-yellow-300 sm:py-4 sm:text-3xl">
        Connect<span className="text-red-500">Four</span>
      </h1>
      <div className="mx-auto my-6 grid h-3/4 w-3/4 grid-rows-6 place-items-center gap-6 rounded-lg bg-blue-900 py-6 sm:h-[512px] sm:w-[512px] sm:gap-0 sm:py-0">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full grid-cols-7 place-items-center"
          >
            {row.map((cell, colIndex) => {
              return (
                <span
                  key={colIndex}
                  className="relative inline-block h-6 w-6 rounded-full bg-gray-300 sm:h-12 sm:w-12"
                  onClick={() => handleClick(colIndex)}
                >
                  <span
                    className={`w-full h-full transition-all duration-[2000] rounded-full absolute grid place-items-center ${
                      cell === "red" ? "bg-red-500" : "bg-yellow-400"
                    } ${cell ? "top-0" : "top-[-1000px]"}`}
                  >
                    <AiFillStar className="text-base text-gray-900 sm:text-2xl" />
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {winner && (
        <div className="flex flex-col gap-6">
          <p className="text-center text-xl font-semibold sm:text-2xl">
            Winner: {winner}
          </p>
          <button
            className="mx-auto block rounded-xl bg-blue-900 px-4 py-2 text-xl transition-all hover:bg-zinc-900"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      )}
      {!winner && (
        <p className="text-center text-xl font-semibold sm:text-2xl">
          Turn :{" "}
          <span
            className={`${
              playerTurn == "red" ? "text-red-400" : "text-yellow-400"
            }`}
          >
            {playerTurn == "red" ? "Red" : "Yellow"}
          </span>
        </p>
      )}
    </div>
  );
}
