import PieceName from "src/features/game/enums/PieceName";
import Coords from "src/features/game/types/Coords";
import Side from "../enums/Side";
import { isEnemyFigure } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export const xSigns = { [Side.white]: 1, [Side.black]: -1 };
export const pawnStartX = { [Side.white]: 1, [Side.black]: 6 };

export default class Pawn extends Piece {
  name = PieceName.pawn;
  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    const { grid } = gameState;
    const { x, y } = coords;
    const result = [];
    const startX = pawnStartX[this.side];
    const xSign = xSigns[this.side];
    if (grid[x + xSign][y] === null) {
      result.push({ x: x + xSign, y });
      if (x === startX && grid[x + 2 * xSign][y] === null) {
        result.push({ x: x + 2 * xSign, y });
      }
    }
    result.push(...this.getAttackCells(gameState, coords));
    return result;
  }

  getAttackCells(gameState: GameStateData, coords: Coords): Coords[] {
    const { x, y } = coords;
    const result = [];
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
      result.push({ x: x + xSign, y: lastMove.to.y });
    }
    if (isEnemyFigure(gameState.grid, coords, { x: x + xSign, y: y - 1 })) {
      result.push({ x: x + xSign, y: y - 1 });
    }
    if (isEnemyFigure(gameState.grid, coords, { x: x + xSign, y: y + 1 })) {
      result.push({ x: x + xSign, y: y + 1 });
    }
    return result;
  }
}
