import {Figure} from "src/types/Figure";
import {GameState} from "src/types/GameState";
import {isEnemyFigure} from "src/features/figures/calcMoves";
import {Side} from "src/enums/Side";

const xSigns = { [Side.WHITE]: 1, [Side.BLACK]: -1 };
const pawnStartX = { [Side.WHITE]: 1, [Side.BLACK]: 6 };

export class Pawn extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        const { grid } = gameState;
        const result: [number, number][] = [];
        const startX = pawnStartX[this.side];
        const xSign = xSigns[this.side];
        if (grid[x + xSign][y] === null) {
            result.push([x + xSign, y]);
            if (x === startX && grid[x + 2 * xSign][y] === null) {
                result.push([x + 2 * xSign, y]);
            }
        }
        result.push(...this.getAllowedAttackCells(gameState, x, y));
        return result;
    }

    getAllowedAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
        const result: [number, number][] = [];
        const xSign = xSigns[this.side];
        if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y - 1])) {
            result.push([x + xSign, y - 1]);
        }
        if (isEnemyFigure(gameState.grid, [x, y], [x + xSign, y + 1])) {
            result.push([x + xSign, y + 1]);
        }
        return result;
    }
}