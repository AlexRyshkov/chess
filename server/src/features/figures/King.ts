import {GameState} from "src/types/GameState";
import {Figure} from "src/types/Figure";
import {isEnemyFigure, isInGridRange} from "src/features/figures/calcMoves";

export class King extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        const result: [number, number][] = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newX = x + i;
                const newY = y + j;
                if (
                    (isInGridRange(gameState.grid, newX, newY) && gameState.grid[newX][newY] === null) ||
                    isEnemyFigure(gameState.grid, [x, y], [newX, newY])
                ) {
                    result.push([newX, newY]);
                }
            }
        }
        return result;
    }
}