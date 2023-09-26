import { useState } from "react";
import { checkForWin } from "../functions/checkForWin";

import { AiFillStar } from "react-icons/ai";

export default function Game({ gameCode }: { gameCode: string }) {
  const numRows = 6;
  const numCols = 7;
  const [board, setBoard] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(null))
  );
  const [playerTurn, setPlayerTurn] = useState<string>("red");
  const [winner, setWinner] = useState<string>("");

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
      <h1 className="pt-8 pb-4 sm:py-4 text-center text-yellow-300 text-2xl sm:text-3xl font-bold">
        Connect<span className="text-red-500">Four</span>
      </h1>
      <div className="my-6 mx-auto w-3/4 h-3/4 sm:w-[512px] sm:h-[512px] rounded-lg py-6 sm:py-0 grid grid-rows-6 gap-6 sm:gap-0 place-items-center bg-blue-900">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="w-full grid grid-cols-7 place-items-center"
          >
            {row.map((cell, colIndex) => {
              return (
                <span
                  key={colIndex}
                  className="relative w-6 h-6 sm:w-12 sm:h-12 rounded-full inline-block bg-gray-300"
                  onClick={() => handleClick(colIndex)}
                >
                  <span
                    className={`w-full h-full transition-all duration-[2000] rounded-full absolute grid place-items-center ${
                      cell === "red" ? "bg-red-500" : "bg-yellow-400"
                    } ${cell ? "top-0" : "top-[-1000px]"}`}
                  >
                    <AiFillStar className="text-base sm:text-2xl text-gray-900" />
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {winner && (
        <div className="flex flex-col gap-6">
          <p className="text-xl sm:text-2xl font-semibold text-center">
            Winner: {winner}
          </p>
          <button
            className="block mx-auto px-4 py-2 rounded-xl text-xl transition-all bg-blue-900 hover:bg-zinc-900"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      )}
      {!winner && (
        <p className="text-xl sm:text-2xl font-semibold text-center">
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
