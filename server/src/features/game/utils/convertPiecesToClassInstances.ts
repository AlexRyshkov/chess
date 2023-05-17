import createPiece from "./createPiece";
import GameStateData from "src/features/game/types/GameStateData";

export default function (gameState: GameStateData): GameStateData {
  const { grid } = gameState;
  const newGrid = Array(8);
  for (let i = 0; i < grid.length; i++) {
    newGrid[i] = Array(8).fill(null);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== null) {
        newGrid[i][j] = createPiece(grid[i][j].name, grid[i][j].side);
      }
    }
  }

  return { ...gameState, grid: newGrid };
}
