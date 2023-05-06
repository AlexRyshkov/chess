import { GameState } from "src/features/game/types/GameState";
import {
  getSideAttackedCells,
  hasMovedPreviously,
  isEnemyFigure,
  isInGridRange,
} from "src/features/game/figures/calcMoves";
import { Figure } from "src/features/game/figures/Figure";
import { FIGURE_START_LOCATIONS } from "./startLocations";

export class King extends Figure {
  name = "King";

  getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
    const result: [number, number][] = [];

    // castling check
    if (!gameState.isCheck) {
      const kingMoved = hasMovedPreviously(
        gameState,
        FIGURE_START_LOCATIONS[this.side][this.name]
      );
      const rookStartLocations = FIGURE_START_LOCATIONS[this.side]["Rook"];

      if (!kingMoved) {
        for (const [rookX, rookY] of rookStartLocations) {
          const castlingSign = rookY > y ? -1 : 1;

          const sideAttackedCells = getSideAttackedCells(gameState, this.side);

          // check if some of king passed cells is under attack
          if (
            sideAttackedCells.some(
              ([, y]) => y === y - castlingSign || y === y - 2 * castlingSign
            )
          ) {
            continue;
          }

          if (!hasMovedPreviously(gameState, [rookX, rookY])) {
            let canDoCastling = true;
            for (let i = rookY + castlingSign; i < y; i = i + castlingSign) {
              if (gameState.grid[x][i] !== null) {
                canDoCastling = false;
                break;
              }
            }
            if (canDoCastling) {
              result.push([x, y - 2 * castlingSign]);
            }
          }
        }
      }
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
        if (
          (isInGridRange(gameState.grid, newX, newY) &&
            gameState.grid[newX][newY] === null) ||
          isEnemyFigure(gameState.grid, [x, y], [newX, newY])
        ) {
          result.push([newX, newY]);
        }
      }
    }
    return result;
  }
}
