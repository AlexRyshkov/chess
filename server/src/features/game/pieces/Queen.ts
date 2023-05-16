import PieceName from "src/features/game/enums/PieceName";
import { calcDiagonalMoves, calcStraightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export default class Queen extends Piece {
  name = PieceName.queen;

  getMoves(gameState: GameStateData, x: number, y: number): [number, number][] {
    return [
      ...calcStraightMoves(gameState.grid, x, y),
      ...calcDiagonalMoves(gameState.grid, x, y),
    ];
  }
}
