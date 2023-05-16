import Side from "../enums/Side";
import { getAllowedMoves } from "../moves/move";
import GameStateData from "../types/GameStateData";
import createGrid from "./createGrid";

export default function createGameState(): GameStateData {
  const gameState = {
    grid: createGrid(),
    currentSideMove: Side.white,
    allowedMoves: {},
    history: [],
    isCheck: false,
    isMate: false,
  };

  return {
    ...gameState,
    allowedMoves: getAllowedMoves(gameState, gameState.currentSideMove),
  };
}
