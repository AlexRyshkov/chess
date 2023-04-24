import {Figure} from "src/features/game/figures/Figure";
import {GameState} from "src/features/game/types/GameState";
import {calcDiagonalMoves} from "src/features/game/figures/calcMoves";

export class Bishop extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcDiagonalMoves(gameState.grid, x, y);
    }

    name: string = 'Bishop';
}

