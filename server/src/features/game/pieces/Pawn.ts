import PieceName from "src/features/game/enums/PieceName";
import Side from "../enums/Side";
import { isEnemyFigure } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export const xSigns = { [Side.white]: 1, [Side.black]: -1 };
export const pawnStartX = { [Side.white]: 1, [Side.black]: 6 };

export default class Pawn extends Piece {
  name = PieceName.pawn;
  getMoves(gameState: GameStateData, x: number, y: number): [number, number][] {
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
    gameState: GameStateData,
    x: number,
    y: number
  ): [number, number][] {
    const result: [number, number][] = [];
    const xSign = xSigns[this.side];
    const lastMove = gameState.history[gameState.history.length - 1];
    const isEnemyPawnFirstMove =
      lastMove?.piece?.name === PieceName.pawn &&
      lastMove.from[0] === pawnStartX[lastMove.piece.side];
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
