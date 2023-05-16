import PieceName from "src/features/game/enums/PieceName";
import { calcKnightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export default class Knight extends Piece {
  name = PieceName.knight;

  getMoves(gameState: GameStateData, x: number, y: number): [number, number][] {
    return calcKnightMoves(gameState.grid, x, y);
  }
}
