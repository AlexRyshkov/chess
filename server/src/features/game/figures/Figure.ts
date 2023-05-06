import { Side } from "src/features/game/enums/Side";
import { filterMovesByCheck } from "src/features/game/figures/calcMoves";
import { GameState } from "src/features/game/types/GameState";

export abstract class Figure {
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
