import Side from "../enums/side";
import { isEnemyFigure } from "../logic/calcMoves";
import GameState from "../types/GameState";
import Figure from "./Figure";

export const xSigns = { [Side.WHITE]: 1, [Side.BLACK]: -1 };
export const pawnStartX = { [Side.WHITE]: 1, [Side.BLACK]: 6 };

export default class Pawn extends Figure {
  name = "Pawn";
  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
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
    result.push(...this.getAttackCells(gameState, x, y));
    return result;
  }

  getAttackCells(
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
    if (
      isEnemyPawnFirstMove &&
      Math.abs(lastMove.to[1] - y) === 1 &&
      lastMove.to[0] === x
    ) {
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
