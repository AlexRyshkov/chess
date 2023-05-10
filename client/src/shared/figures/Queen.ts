import { calcDiagonalMoves, calcStraightMoves } from "../logic/calcMoves";
import GameState from "../types/GameState";
import Figure from "./Figure";

export default class Queen extends Figure {
  name = "Queen";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return [
      ...calcStraightMoves(gameState.grid, x, y),
      ...calcDiagonalMoves(gameState.grid, x, y),
    ];
  }
}
