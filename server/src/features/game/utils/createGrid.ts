import Side from "../enums/Side";
import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";
import Grid from "../types/Grid";

export default function createGrid(): Grid {
  const grid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Array(8).fill(null);
  }

  grid[0][0] = new Rook(Side.White);
  grid[0][1] = new Knight(Side.White);
  grid[0][2] = new Bishop(Side.White);
  grid[0][3] = new King(Side.White);
  grid[0][4] = new Queen(Side.White);
  grid[0][5] = new Bishop(Side.White);
  grid[0][6] = new Knight(Side.White);
  grid[0][7] = new Rook(Side.White);

  grid[1][0] = new Pawn(Side.White);
  grid[1][1] = new Pawn(Side.White);
  grid[1][2] = new Pawn(Side.White);
  grid[1][3] = new Pawn(Side.White);
  grid[1][4] = new Pawn(Side.White);
  grid[1][5] = new Pawn(Side.White);
  grid[1][6] = new Pawn(Side.White);
  grid[1][7] = new Pawn(Side.White);

  grid[7][0] = new Rook(Side.Black);
  grid[7][1] = new Knight(Side.Black);
  grid[7][2] = new Bishop(Side.Black);
  grid[7][3] = new King(Side.Black);
  grid[7][4] = new Queen(Side.Black);
  grid[7][5] = new Bishop(Side.Black);
  grid[7][6] = new Knight(Side.Black);
  grid[7][7] = new Rook(Side.Black);

  grid[6][0] = new Pawn(Side.Black);
  grid[6][1] = new Pawn(Side.Black);
  grid[6][2] = new Pawn(Side.Black);
  grid[6][3] = new Pawn(Side.Black);
  grid[6][4] = new Pawn(Side.Black);
  grid[6][5] = new Pawn(Side.Black);
  grid[6][6] = new Pawn(Side.Black);
  grid[6][7] = new Pawn(Side.Black);

  return grid;
}
