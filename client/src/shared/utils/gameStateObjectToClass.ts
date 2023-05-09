import figureObjectToClass from './figureObjectToClass';

export default function (gameState: any) {
  const { grid } = gameState;
  const newGrid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = Array(8).fill(null);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null) {
        newGrid[i][j] = figureObjectToClass(grid[i][j]);
      }
    }
  }

  return { ...gameState, grid: newGrid };
}
