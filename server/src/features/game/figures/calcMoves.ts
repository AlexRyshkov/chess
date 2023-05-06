import { Side } from "../enums/Side";
import { GameState } from "../types/GameState";
import { Grid } from "../types/Grid";

const diagonalMoveFunctions: [
  (x: number, delta: number) => number,
  (y: number, delta: number) => number
][] = [
  [(x, delta) => x + delta, (y, delta) => y + delta],
  [(x, delta) => x + delta, (y, delta) => y - delta],
  [(x, delta) => x - delta, (y, delta) => y + delta],
  [(x, delta) => x - delta, (y, delta) => y - delta],
];

const straightMoveFunctions: [
  (x: number, delta: number) => number,
  (y: number, delta: number) => number
][] = [
  [(x, delta) => x + delta, (y, delta) => y],
  [(x, delta) => x - delta, (y, delta) => y],
  [(x, delta) => x, (y, delta) => y + delta],
  [(x, delta) => x, (y, delta) => y - delta],
];

function getKnightPossibleMoves(grid: Grid, x: number, y: number): any {
  return [
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x + 1, y - 2],
    [x + 1, y + 2],
  ].filter((cords) => isInGridRange(grid, ...cords));
}

export function isInGridRange(grid: Grid, ...coords: number[]) {
  return coords.every((cord) => cord >= 0 && cord < grid.length);
}

export function isEnemyFigure(
  grid: Grid,
  [x1, y1]: number[],
  [x2, y2]: number[]
) {
  if (isInGridRange(grid, x1, y1, x2, y2)) {
    const f1 = grid[x1][y1];
    const f2 = grid[x2][y2];

    return f1 !== null && f2 !== null && f1.side !== f2.side;
  }
  return false;
}

export function calcStraightMoves(grid: Grid, x: number, y: number) {
  const result: [number, number][] = [];
  for (const [calcX, calcY] of straightMoveFunctions) {
    result.push(...calcAllowedMove(grid, x, y, calcX, calcY));
  }
  return result;
}

export function calcDiagonalMoves(grid: Grid, x: number, y: number) {
  const result: [number, number][] = [];
  for (const [calcX, calcY] of diagonalMoveFunctions) {
    result.push(...calcAllowedMove(grid, x, y, calcX, calcY));
  }
  return result;
}

export function calcKnightMoves(grid: Grid, x: number, y: number) {
  const result: [number, number][] = [];
  for (const cords of getKnightPossibleMoves(grid, x, y)) {
    result.push(cords);
  }
  return result.filter(
    ([x1, y1]) => grid[x1][y1] === null || isEnemyFigure(grid, [x, y], [x1, y1])
  );
}

function calcAllowedMove(
  grid: Grid,
  x: number,
  y: number,
  calcX: (x: number, delta: number) => number,
  calcY: (y: number, delta: number) => number
): [number, number][] {
  const result: [number, number][] = [];
  for (let i = 1; i < grid.length; i++) {
    const newX = calcX(x, i);
    const newY = calcY(y, i);
    if (isInGridRange(grid, newX, newY)) {
      if (grid[newX][newY] !== null) {
        if (isEnemyFigure(grid, [x, y], [newX, newY])) {
          result.push([newX, newY]);
        }
        break;
      }
      result.push([newX, newY]);
    }
  }
  return result;
}

export function filterMovesByCheck(
  gameState: GameState,
  x: number,
  y: number,
  moves: [number, number][]
): [number, number][] {
  const { grid } = gameState;
  const side = grid[x][y]!.side;
  const result: [number, number][] = [];

  for (const [x1, y1] of moves) {
    const newGrid = grid.map((row) => row.slice());
    newGrid[x1][y1] = newGrid[x][y];
    newGrid[x][y] = null;
    if (!calcIsCheck({ ...gameState, grid: newGrid }, side)) {
      result.push([x1, y1]);
    }
  }

  return result;
}

export function getSideAttackedCells(
  gameState: GameState,
  side: Side
): [number, number][] {
  const { grid } = gameState;
  const result: [number, number][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const cell = grid[i][j];
      if (cell !== null && cell.side !== side) {
        result.push(...cell.getAttackCells(gameState, i, j));
      }
    }
  }
  return result;
}

function isKingAttacked(gameState: GameState, side: Side) {
  const { grid } = gameState;
  const sideAttackedCells = getSideAttackedCells(gameState, side);
  return sideAttackedCells.some(([x, y]) =>
    grid[x][y]?.name === "King" ? grid[x][y]?.side === side : false
  );
}

export function calcIsCheck(gameState: GameState, side: Side) {
  return isKingAttacked(gameState, side);
}

export function calcIsMate(gameState: GameState, side: Side) {
  const { grid } = gameState;
  if (calcIsCheck(gameState, side)) {
    const figuresPositions = getFiguresPositions(grid, side);
    return figuresPositions.every(([x, y]) => {
      return grid[x][y]?.getMoves(gameState, x, y).every(([x1, y1]) => {
        const newGrid = grid.map((row) => row.slice());
        newGrid[x1][y1] = newGrid[x][y];
        newGrid[x][y] = null;
        return calcIsCheck({ ...gameState, grid: newGrid }, side);
      });
    });
  }
  return false;
}

function getKing(grid: Grid, side: Side) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j]?.name === "King" && grid[i][j]?.side === side) {
        return grid[i][j];
      }
    }
  }
}

function getFiguresPositions(grid: Grid, side: Side) {
  const result: [number, number][] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null && grid[i][j]?.side === side) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

export function hasMovedPreviously(
  gameState: GameState,
  from: [number, number]
) {
  return (
    gameState.history.filter(
      (move) => move.from[0] === from[0] && move.from[1] === from[1]
    ).length > 0
  );
}
