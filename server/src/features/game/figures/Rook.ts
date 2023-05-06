import { calcStraightMoves } from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { GameState } from "src/features/game/types/GameState";

export class Rook extends Figure {
  name: string = "Rook";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcStraightMoves(gameState.grid, x, y);
  }
}
