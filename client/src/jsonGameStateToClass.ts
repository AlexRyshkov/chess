import { Bishop, Figure, King, Knight, Pawn, Queen, Rook } from './features/figures/figure';

export const objectToFigure = (object: Figure): Figure | null => {
  if (object?.name === 'Pawn') return new Pawn(object.side);
  if (object?.name === 'Rook') return new Rook(object.side);
  if (object?.name === 'Knight') return new Knight(object.side);
  if (object?.name === 'Bishop') return new Bishop(object.side);
  if (object?.name === 'Queen') return new Queen(object.side);
  if (object?.name === 'King') return new King(object.side);

  return null;
};

export default function (gameState: any) {
  const { grid } = gameState;
  const newGrid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = Array(8).fill(null);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null) {
        newGrid[i][j] = objectToFigure(grid[i][j]);
      }
    }
  }

  return { ...gameState, grid: newGrid };
}
