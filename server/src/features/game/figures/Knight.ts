import { calcKnightMoves } from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { GameState } from "src/features/game/types/GameState";

export class Knight extends Figure {
  name: string = "Knight";

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcKnightMoves(gameState.grid, x, y);
  }
}
