import { GameState } from '../game/GameProvider';
import {
  calcDiagonalMoves,
  calcKnightMoves,
  calcStraightMoves,
  filterMovesByCheck,
  hasMovedPreviously,
  isEnemyFigure,
  isInGridRange,
} from './calcMoves';

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

  abstract getMoves(gameState: GameState, x: number, y: number): [number, number][];

  getAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
    return this.getMoves(gameState, x, y);
  }

  getAllowedMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return filterMovesByCheck(gameState, x, y, this.getMoves(gameState, x, y));
  }
}

export class Pawn extends Figure {
  name = 'Pawn';
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

  getAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
    const result: [number, number][] = [];
    const xSign = xSigns[this.side];
    const lastMove = gameState.history[gameState.history.length - 1];
    const isEnemyPawnFirstMove =
      lastMove?.figure?.name === 'Pawn' && lastMove.from[0] === pawnStartX[lastMove.figure.side];
    if (isEnemyPawnFirstMove && Math.abs(lastMove.to[1] - y) === 1 && lastMove.to[0] === x) {
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

export class Bishop extends Figure {
  name = 'Bishop';

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcDiagonalMoves(gameState.grid, x, y);
  }
}

export class Knight extends Figure {
  name = 'Knight';

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcKnightMoves(gameState.grid, x, y);
  }
}

export class Rook extends Figure {
  name = 'Rook';

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return calcStraightMoves(gameState.grid, x, y);
  }
}

export class Queen extends Figure {
  name = 'Queen';

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    return [...calcStraightMoves(gameState.grid, x, y), ...calcDiagonalMoves(gameState.grid, x, y)];
  }
}

export class King extends Figure {
  name = 'King';

  getMoves(gameState: GameState, x: number, y: number): [number, number][] {
    const result: [number, number][] = [];

    // castling check
    if (!gameState.isCheck) {
      const kingMoved = hasMovedPreviously(gameState, FIGURE_START_LOCATIONS[this.side][this.name]);
      const rookStartLocations = FIGURE_START_LOCATIONS[this.side]['Rook'];

      if (!kingMoved) {
        for (const [rookX, rookY] of rookStartLocations) {
          const castlingSign = rookY > y ? -1 : 1;
          if (!hasMovedPreviously(gameState, [rookX, rookY])) {
            let canDoCastling = true;
            for (let i = rookY + castlingSign; i < y; i = i + castlingSign) {
              if (gameState.grid[x][i] !== null) {
                canDoCastling = false;
                break;
              }
            }
            if (canDoCastling) {
              result.push([x, y - 2 * castlingSign]);
            }
          }
        }
      }
    }

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

  override getAllowedMoves(gameState: GameState, x: number, y: number): [number, number][] {
    const moves = super.getAllowedMoves(gameState, x, y);
    const filteredByCastling = moves.filter(([, moveY]) => {
      // castling move
      if (Math.abs(moveY - y) === 2) {
        console.log(moveY);
        return moves.some(([, y]) => Math.abs(moveY - y) === 1);
      }
      return true;
    });

    return filteredByCastling;
  }
}

const FIGURE_START_LOCATIONS: any = {
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
