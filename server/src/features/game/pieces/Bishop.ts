import PieceName from "src/features/game/enums/PieceName";
import { calcDiagonalMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export default class Bishop extends Piece {
  name = PieceName.bishop;

  getMoves(gameState: GameStateData, x: number, y: number): [number, number][] {
    return calcDiagonalMoves(gameState.grid, x, y);
  }
}
