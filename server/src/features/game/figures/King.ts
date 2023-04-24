import {GameState} from "src/features/game/types/GameState";
import {isEnemyFigure, isInGridRange} from "src/features/game/figures/calcMoves";
import {Figure} from "src/features/game/figures/Figure";

export class King extends Figure {
    name: string = 'King';


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