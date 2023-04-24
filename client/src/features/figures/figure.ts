import {
    calcDiagonalMoves,
    calcKnightMoves,
    calcStraightMoves,
    filterMovesByCheck,
    isEnemyFigure,
    isInGridRange,
} from './calcMoves';
import {GameState} from '../game/GameProvider';

export type Grid = (Figure | null)[][];

export enum Side {
  WHITE = 'white',
  BLACK = 'black',
}

const xSigns = { [Side.WHITE]: 1, [Side.BLACK]: -1 };
const pawnStartX = { [Side.WHITE]: 1, [Side.BLACK]: 6 };

export abstract class Figure {
  side: Side;
  abstract name: string;

  constructor(side: Side) {
    this.side = side;
  }

  abstract getAllMoves(gameState: GameState, x: number, y: number): [number, number][];

  getAllowedMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return filterMovesByCheck(gameState, x, y, this.getAllMoves(gameState, x, y));
  }

  getAllowedAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
    return this.getAllMoves(gameState, x, y);
  }
}

export class Pawn extends Figure {
  name='Pawn';
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

  getAllowedAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
    const result: [number, number][] = [];
    const xSign = xSigns[this.side];
    if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y - 1])) {
      result.push([x + xSign, y - 1]);
    }
    if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y + 1])) {
      result.push([x + xSign, y + 1]);
    }
    return result;
  }
}

export class Bishop extends Figure {
  name='Bishop';

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcDiagonalMoves(gameState.grid, x, y);
  }
}

export class Knight extends Figure {
  name='Knight';

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcKnightMoves(gameState.grid, x, y);
  }
}

export class Rook extends Figure {
  name='Rook';

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcStraightMoves(gameState.grid, x, y);
  }
}

export class Queen extends Figure {
  name='Queen';

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return [...calcStraightMoves(gameState.grid, x, y), ...calcDiagonalMoves(gameState.grid, x, y)];
  }
}

export class King extends Figure {
  name='King';

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    const result: [number, number][] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
        if (
          (isInGridRange(gameState.grid, newX, newY) && gameState.grid[newX][newY] === null) ||
          isEnemyFigure(gameState.grid, [x, y], [newX, newY])
        ) {
          result.push([newX, newY]);
        }
      }
    }
    return result;
  }
}
