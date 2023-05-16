import PieceName from "src/features/game/enums/PieceName";
import Side from "../enums/Side";
import { filterMovesByCheck } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";

export default abstract class Piece {
  side: Side;
  abstract name: PieceName;

  constructor(side: Side) {
    this.side = side;
  }

  abstract getMoves(
    gameState: GameStateData,
    x: number,
    y: number
  ): [number, number][];

  getAttackCells(
    gameState: GameStateData,
    x: number,
    y: number
  ): [number, number][] {
    return this.getMoves(gameState, x, y);
  }

  getAllowedMoves(
    gameState: GameStateData,
    x: number,
    y: number
  ): [number, number][] {
    return filterMovesByCheck(gameState, x, y, this.getMoves(gameState, x, y));
  }
}

export const PieceStartLocation: any = {
  [Side.white]: {
    Rook: [
      [0, 0],
      [0, 7],
    ],
    King: [0, 3],
  },
  [Side.black]: {
    Rook: [
      [7, 0],
      [7, 7],
    ],
    King: [7, 3],
  },
};
