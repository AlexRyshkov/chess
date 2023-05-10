import Side from "src/shared/enums/side";
import Bishop from "src/shared/figures/Bishop";
import King from "src/shared/figures/King";
import Knight from "src/shared/figures/Knight";
import Pawn from "src/shared/figures/Pawn";
import Queen from "src/shared/figures/Queen";
import Rook from "src/shared/figures/Rook";
import GameState from "src/shared/types/GameState";
import Grid from "src/shared/types/Grid";

export function createGameState(): GameState {
  const gameState = {
    grid: createDefaultGrid(),
    currentSideMove: Side.WHITE,
    allowedMoves: {},
    history: [],
    isCheck: false,
    isMate: false,
  };

  return {
    ...gameState,
    allowedMoves: getAllowedMoves(gameState, gameState.currentSideMove),
  };
}

export function getAllowedMoves(
  gameState: GameState,
  side: Side
): { [key: string]: [number, number][] } {
  let result = {};
  for (let i = 0; i < gameState.grid.length; i++) {
    for (let j = 0; j < gameState.grid.length; j++) {
      const figure = gameState.grid[i][j];
      if (figure !== null && figure.side === side) {
        result[`[${i}, ${j}]`] = figure.getAllowedMoves(gameState, i, j);
      }
    }
  }
  return result;
}

export function createDefaultGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new Rook(Side.WHITE);
  grid[0][1] = new Knight(Side.WHITE);
  grid[0][2] = new Bishop(Side.WHITE);
  grid[0][3] = new King(Side.WHITE);
  grid[0][4] = new Queen(Side.WHITE);
  grid[0][5] = new Bishop(Side.WHITE);
  grid[0][6] = new Knight(Side.WHITE);
  grid[0][7] = new Rook(Side.WHITE);

  grid[1][0] = new Pawn(Side.WHITE);
  grid[1][1] = new Pawn(Side.WHITE);
  grid[1][2] = new Pawn(Side.WHITE);
  grid[1][3] = new Pawn(Side.WHITE);
  grid[1][4] = new Pawn(Side.WHITE);
  grid[1][5] = new Pawn(Side.WHITE);
  grid[1][6] = new Pawn(Side.WHITE);
  grid[1][7] = new Pawn(Side.WHITE);

  grid[7][0] = new Rook(Side.BLACK);
  grid[7][1] = new Knight(Side.BLACK);
  grid[7][2] = new Bishop(Side.BLACK);
  grid[7][3] = new King(Side.BLACK);
  grid[7][4] = new Queen(Side.BLACK);
  grid[7][5] = new Bishop(Side.BLACK);
  grid[7][6] = new Knight(Side.BLACK);
  grid[7][7] = new Rook(Side.BLACK);

  grid[6][0] = new Pawn(Side.BLACK);
  grid[6][1] = new Pawn(Side.BLACK);
  grid[6][2] = new Pawn(Side.BLACK);
  grid[6][3] = new Pawn(Side.BLACK);
  grid[6][4] = new Pawn(Side.BLACK);
  grid[6][5] = new Pawn(Side.BLACK);
  grid[6][6] = new Pawn(Side.BLACK);
  grid[6][7] = new Pawn(Side.BLACK);

  return grid;
}

export function createCastlingGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new Rook(Side.WHITE);
  grid[0][3] = new King(Side.WHITE);
  grid[0][7] = new Rook(Side.WHITE);

  grid[1][0] = new Pawn(Side.WHITE);
  grid[1][1] = new Pawn(Side.WHITE);
  grid[1][2] = new Pawn(Side.WHITE);
  grid[1][3] = new Pawn(Side.WHITE);
  grid[1][4] = new Pawn(Side.WHITE);
  grid[1][5] = new Pawn(Side.WHITE);
  grid[1][6] = new Pawn(Side.WHITE);
  grid[1][7] = new Pawn(Side.WHITE);

  grid[7][0] = new Rook(Side.BLACK);
  grid[7][1] = new Knight(Side.BLACK);
  grid[7][2] = new Bishop(Side.BLACK);
  grid[7][3] = new King(Side.BLACK);
  grid[7][4] = new Queen(Side.BLACK);
  grid[7][5] = new Bishop(Side.BLACK);
  grid[7][6] = new Knight(Side.BLACK);
  grid[7][7] = new Rook(Side.BLACK);

  grid[6][0] = new Pawn(Side.BLACK);
  grid[6][1] = new Pawn(Side.BLACK);
  grid[6][2] = new Pawn(Side.BLACK);
  grid[6][3] = new Pawn(Side.BLACK);
  grid[6][4] = new Pawn(Side.BLACK);
  grid[6][5] = new Pawn(Side.BLACK);
  grid[6][6] = new Pawn(Side.BLACK);
  grid[6][7] = new Pawn(Side.BLACK);

  return grid;
}

export function createBeforeCheckGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new King(Side.BLACK);
  grid[7][7] = new King(Side.WHITE);
  grid[1][7] = new Queen(Side.WHITE);

  return grid;
}
