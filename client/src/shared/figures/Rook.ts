import { calcStraightMoves } from "../logic/calcMoves";
import GameState from "../types/GameState";
import Figure from "./Figure";

export default class Rook extends Figure {
  name = "Rook";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcStraightMoves(gameState.grid, x, y);
  }
}
