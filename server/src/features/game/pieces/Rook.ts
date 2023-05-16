import PieceName from "src/features/game/enums/PieceName";
import { calcStraightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export default class Rook extends Piece {
  name = PieceName.rook;

  getMoves(gameState: GameStateData, x: number, y: number): [number, number][] {
    return calcStraightMoves(gameState.grid, x, y);
  }
}
