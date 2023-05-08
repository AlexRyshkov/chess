import { Figure, Grid } from 'features/figures/figure';
import { objectToFigure } from 'jsonGameStateToClass';

export function flipGrid(grid: Grid) {
  const newGrid = Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = Array(grid.length).fill(null);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null) {
        newGrid[grid.length - i - 1][grid.length - j - 1] = objectToFigure(grid[i][j] as Figure);
      }
    }
  }

  return newGrid;
}
