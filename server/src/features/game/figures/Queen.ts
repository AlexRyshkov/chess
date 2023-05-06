import {
  calcDiagonalMoves,
  calcStraightMoves,
} from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { GameState } from "src/features/game/types/GameState";

export class Queen extends Figure {
  name: string = "Queen";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return [
      ...calcStraightMoves(gameState.grid, x, y),
      ...calcDiagonalMoves(gameState.grid, x, y),
    ];
  }
}
