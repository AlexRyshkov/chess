import { Side } from "src/features/game/enums/Side";
import { isEnemyFigure } from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { GameState } from "src/features/game/types/GameState";

const xSigns = { [Side.WHITE]: 1, [Side.BLACK]: -1 };
const pawnStartX = { [Side.WHITE]: 1, [Side.BLACK]: 6 };

export class Pawn extends Figure {
  name: string = "Pawn";

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    const { grid } = gameState;
    const result: [number, number][] = [];
    const startX = pawnStartX[this.side];
    const xSign = xSigns[this.side];
    if (grid[x + xSign][y] === null) {
      result.push([x + xSign, y]);
      if (x === startX && grid[x + 2 * xSign][y] === null) {
        result.push([x + 2 * xSign, y]);
      }
    }
    result.push(...this.getAllowedAttackCells(gameState, x, y));
    return result;
  }

  getAllowedAttackCells(
    gameState: GameState,
    x: number,
    y: number
  ): [number, number][] {
    const result: [number, number][] = [];
    const xSign = xSigns[this.side];

    const lastMove = gameState.history[gameState.history.length - 1];
    const isEnemyPawnFirstMove =
      lastMove?.figure?.name === "Pawn" &&
      lastMove.from[0] === pawnStartX[lastMove.figure.side];
    if (isEnemyPawnFirstMove && Math.abs(lastMove.to[1] - y) === 1) {
      result.push([x + xSign, lastMove.to[1]]);
    }
    if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y - 1])) {
      result.push([x + xSign, y - 1]);
    }
    if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y + 1])) {
      result.push([x + xSign, y + 1]);
    }
    return result;
  }
}
