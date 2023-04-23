import {Figure} from "src/types/Figure";
import {GameState} from "src/types/GameState";
import {calcDiagonalMoves} from "src/features/figures/calcMoves";

export class Bishop extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcDiagonalMoves(gameState.grid, x, y);
    }
}

