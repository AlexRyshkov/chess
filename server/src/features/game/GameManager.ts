import Side from "src/features/game/enums/Side";
import Bishop from "src/features/game/pieces/Bishop";
import King from "src/features/game/pieces/King";
import Knight from "src/features/game/pieces/Knight";
import Pawn from "src/features/game/pieces/Pawn";
import Queen from "src/features/game/pieces/Queen";
import Rook from "src/features/game/pieces/Rook";
import GameStateData from "src/features/game/types/GameStateData";
import Grid from "src/features/game/types/Grid";

export function createGameState(): GameStateData {
  const gameState = {
    grid: createDefaultGrid(),
    currentSideMove: Side.white,
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
  gameState: GameStateData,
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

  grid[0][0] = new Rook(Side.white);
  grid[0][1] = new Knight(Side.white);
  grid[0][2] = new Bishop(Side.white);
  grid[0][3] = new King(Side.white);
  grid[0][4] = new Queen(Side.white);
  grid[0][5] = new Bishop(Side.white);
  grid[0][6] = new Knight(Side.white);
  grid[0][7] = new Rook(Side.white);

  grid[1][0] = new Pawn(Side.white);
  grid[1][1] = new Pawn(Side.white);
  grid[1][2] = new Pawn(Side.white);
  grid[1][3] = new Pawn(Side.white);
  grid[1][4] = new Pawn(Side.white);
  grid[1][5] = new Pawn(Side.white);
  grid[1][6] = new Pawn(Side.white);
  grid[1][7] = new Pawn(Side.white);

  grid[7][0] = new Rook(Side.black);
  grid[7][1] = new Knight(Side.black);
  grid[7][2] = new Bishop(Side.black);
  grid[7][3] = new King(Side.black);
  grid[7][4] = new Queen(Side.black);
  grid[7][5] = new Bishop(Side.black);
  grid[7][6] = new Knight(Side.black);
  grid[7][7] = new Rook(Side.black);

  grid[6][0] = new Pawn(Side.white);
  grid[6][1] = new Pawn(Side.black);
  grid[6][2] = new Pawn(Side.black);
  grid[6][3] = new Pawn(Side.black);
  grid[6][4] = new Pawn(Side.black);
  grid[6][5] = new Pawn(Side.black);
  grid[6][6] = new Pawn(Side.black);
  grid[6][7] = new Pawn(Side.black);

  return grid;
}

export function createCastlingGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new Rook(Side.white);
  grid[0][3] = new King(Side.white);
  grid[0][7] = new Rook(Side.white);

  grid[1][0] = new Pawn(Side.white);
  grid[1][1] = new Pawn(Side.white);
  grid[1][2] = new Pawn(Side.white);
  grid[1][3] = new Pawn(Side.white);
  grid[1][4] = new Pawn(Side.white);
  grid[1][5] = new Pawn(Side.white);
  grid[1][6] = new Pawn(Side.white);
  grid[1][7] = new Pawn(Side.white);

  grid[7][0] = new Rook(Side.black);
  grid[7][1] = new Knight(Side.black);
  grid[7][2] = new Bishop(Side.black);
  grid[7][3] = new King(Side.black);
  grid[7][4] = new Queen(Side.black);
  grid[7][5] = new Bishop(Side.black);
  grid[7][6] = new Knight(Side.black);
  grid[7][7] = new Rook(Side.black);

  grid[6][0] = new Pawn(Side.black);
  grid[6][1] = new Pawn(Side.black);
  grid[6][2] = new Pawn(Side.black);
  grid[6][3] = new Pawn(Side.black);
  grid[6][4] = new Pawn(Side.black);
  grid[6][5] = new Pawn(Side.black);
  grid[6][6] = new Pawn(Side.black);
  grid[6][7] = new Pawn(Side.black);

  return grid;
}

export function createBeforeCheckGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new King(Side.black);
  grid[7][7] = new King(Side.white);
  grid[1][7] = new Queen(Side.white);

  return grid;
}
