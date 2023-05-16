import PieceName from "src/features/game/enums/PieceName";
import Coords from "src/features/game/types/Coords";
import Side from "../enums/Side";
import GameStateData from "../types/GameStateData";
import Grid from "../types/Grid";

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

function getKnightPossibleMoves(grid: Grid, coords: Coords): Coords[] {
  const { x, y } = coords;
  return [
    { x: x - 2, y: y - 1 },
    { x: x - 2, y: y + 1 },
    { x: x - 1, y: y - 2 },
    { x: x - 1, y: y + 2 },
    { x: x + 2, y: y - 1 },
    { x: x + 2, y: y + 1 },
    { x: x + 1, y: y - 2 },
    { x: x + 1, y: y + 2 },
  ].filter((coords) => isInGridRange(grid, coords.x, coords.y));
}

export function isInGridRange(grid: Grid, ...indexes: number[]) {
  return indexes.every((index) => index >= 0 && index < grid.length);
}

export function isEnemyFigure(
  grid: Grid,
  { x: x1, y: y1 }: Coords,
  { x: x2, y: y2 }: Coords
) {
  if (isInGridRange(grid, x1, y1, x2, y2)) {
    const f1 = grid[x1][y1];
    const f2 = grid[x2][y2];

    return f1 !== null && f2 !== null && f1.side !== f2.side;
  }
  return false;
}

export function calcStraightMoves(grid: Grid, coords: Coords) {
  const result = [];
  for (const [calcX, calcY] of straightMoveFunctions) {
    result.push(...calcAllowedMove(grid, coords, calcX, calcY));
  }
  return result;
}

export function calcDiagonalMoves(grid: Grid, coords: Coords) {
  const result = [];
  for (const [calcX, calcY] of diagonalMoveFunctions) {
    result.push(...calcAllowedMove(grid, coords, calcX, calcY));
  }
  return result;
}

export function calcKnightMoves(grid: Grid, coords: Coords) {
  const result: Coords[] = [];
  for (const cords of getKnightPossibleMoves(grid, coords)) {
    result.push(cords);
  }
  return result.filter(
    ({ x: x1, y: y1 }) =>
      grid[x1][y1] === null || isEnemyFigure(grid, coords, { x: x1, y: y1 })
  );
}

function calcAllowedMove(
  grid: Grid,
  coords: Coords,
  calcX: (x: number, delta: number) => number,
  calcY: (y: number, delta: number) => number
): Coords[] {
  const { x, y } = coords;
  const result: Coords[] = [];
  for (let i = 1; i < grid.length; i++) {
    const newX = calcX(x, i);
    const newY = calcY(y, i);
    if (isInGridRange(grid, newX, newY)) {
      if (grid[newX][newY] !== null) {
        if (isEnemyFigure(grid, coords, { x: newX, y: newY })) {
          result.push({ x: newX, y: newY });
        }
        break;
      }
      result.push({ x: newX, y: newY });
    }
  }
  return result;
}

export function filterMovesByCheck(
  gameState: GameStateData,
  coords: Coords,
  moves: Coords[]
): Coords[] {
  const { x, y } = coords;
  const { grid } = gameState;
  const side = grid[x][y]!.side;
  const result = [];

  for (const { x: x1, y: y1 } of moves) {
    const newGrid = grid.map((row) => row.slice());
    newGrid[x1][y1] = newGrid[x][y];
    newGrid[x][y] = null;
    if (!calcIsCheck({ ...gameState, grid: newGrid }, side)) {
      result.push({ x: x1, y: y1 });
    }
  }

  return result;
}

export function getSideAttackedCells(
  gameState: GameStateData,
  side: Side
): Coords[] {
  const { grid } = gameState;
  const result: Coords[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const cell = grid[i][j];
      if (cell !== null && cell.side !== side) {
        result.push(...cell.getAttackCells(gameState, { x: i, y: j }));
      }
    }
  }
  return result;
}

export function isKingAttacked(gameState: GameStateData, side: Side) {
  const { grid } = gameState;
  const sideAttackedCells = getSideAttackedCells(gameState, side);
  return sideAttackedCells.some(({ x, y }) =>
    grid[x][y]?.name === PieceName.king ? grid[x][y]?.side === side : false
  );
}

export function calcIsCheck(gameState: GameStateData, side: Side) {
  return isKingAttacked(gameState, side);
}

export function calcIsMate(gameState: GameStateData, side: Side) {
  const { grid } = gameState;
  if (calcIsCheck(gameState, side)) {
    const figuresPositions = getFiguresPositions(grid, side);
    return figuresPositions.every(({ x, y }) => {
      return grid[x][y]
        ?.getMoves(gameState, { x, y })
        .every(({ x: x1, y: y1 }) => {
          const newGrid = grid.map((row) => row.slice());
          newGrid[x1][y1] = newGrid[x][y];
          newGrid[x][y] = null;
          return calcIsCheck({ ...gameState, grid: newGrid }, side);
        });
    });
  }
  return false;
}

function getFiguresPositions(grid: Grid, side: Side) {
  const result: Coords[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null && grid[i][j]?.side === side) {
        result.push({ x: i, y: j });
      }
    }
  }
  return result;
}

export function hasMovedPreviously(gameState: GameStateData, from: Coords) {
  return (
    gameState.history.filter(
      (move) => move.from.x === from.x && move.from.x === from.y
    ).length > 0
  );
}
