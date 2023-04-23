import {GameState} from "src/types/GameState";
import {Figure} from "src/types/Figure";
import {calcDiagonalMoves, calcStraightMoves} from "src/features/figures/calcMoves";

export class Queen extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return [...calcStraightMoves(gameState.grid, x, y), ...calcDiagonalMoves(gameState.grid, x, y)];
    }
}

