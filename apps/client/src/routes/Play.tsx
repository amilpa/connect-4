import { Navigate } from "react-router-dom";
import Game from "../components/Game";
export default function Play({ gameCode }: { gameCode: string }) {
  if (!gameCode) return <Navigate to="/" />;
  return <Game gameCode={gameCode} />;
}
