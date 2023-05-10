import Figure from "../figures/Figure";
import Grid from "../types/Grid";
import figureObjectToClass from "./figureObjectToClass";

export function flipGrid(grid: Grid) {
  const newGrid = Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = Array(grid.length).fill(null);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null) {
        newGrid[grid.length - i - 1][grid.length - j - 1] = figureObjectToClass(
          grid[i][j] as Figure
        );
      }
    }
  }

  return newGrid;
}
