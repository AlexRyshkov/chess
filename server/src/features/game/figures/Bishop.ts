import { calcDiagonalMoves } from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { GameState } from "src/features/game/types/GameState";

export class Bishop extends Figure {
  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcDiagonalMoves(gameState.grid, x, y);
  }

  name: string = "Bishop";
}
