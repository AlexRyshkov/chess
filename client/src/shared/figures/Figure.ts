import Side from "../enums/side";
import { filterMovesByCheck } from "../logic/calcMoves";
import GameState from "../types/GameState";

export default abstract class Figure {
  side: Side;
  abstract name: string;

  constructor(side: Side) {
    this.side = side;
  }

  abstract getMoves(
    gameState: GameState,
    x: number,
    y: number
  ): [number, number][];

  getAttackCells(
    gameState: GameState,
    x: number,
    y: number
  ): [number, number][] {
    return this.getMoves(gameState, x, y);
  }

  getAllowedMoves(
    gameState: GameState,
    x: number,
    y: number
  ): [number, number][] {
    return filterMovesByCheck(gameState, x, y, this.getMoves(gameState, x, y));
  }
}

export const FIGURE_START_LOCATIONS: any = {
  [Side.WHITE]: {
    Rook: [
      [0, 0],
      [0, 7],
    ],
    King: [0, 3],
  },
  [Side.BLACK]: {
    Rook: [
      [7, 0],
      [7, 7],
    ],
    King: [7, 3],
  },
};
