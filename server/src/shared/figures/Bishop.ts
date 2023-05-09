import { calcDiagonalMoves } from "../logic/calcMoves";
import GameState from "../types/GameState";
import Figure from "./Figure";

export default class Bishop extends Figure {
  name = "Bishop";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcDiagonalMoves(gameState.grid, x, y);
  }
}
