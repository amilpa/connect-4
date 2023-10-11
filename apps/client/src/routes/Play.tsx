import { useLocation, Navigate } from "react-router-dom";
import Game from "../components/Game";
export default function Play() {
  const location = useLocation();
  if (!location.state.gameCode) return <Navigate to="/" />;
  return <Game gameCode={location.state.gameCode} />;
}
