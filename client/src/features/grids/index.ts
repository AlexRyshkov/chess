import { Bishop, Grid, King, Knight, Pawn, Queen, Rook, Side } from '../figures/figure';

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
