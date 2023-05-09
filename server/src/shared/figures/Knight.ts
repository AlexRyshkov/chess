import { calcKnightMoves } from "../logic/calcMoves";
import GameState from "../types/GameState";
import Figure from "./Figure";

export default class Knight extends Figure {
  name = "Knight";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcKnightMoves(gameState.grid, x, y);
  }
}
