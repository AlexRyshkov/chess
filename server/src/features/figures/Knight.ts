import {GameState} from "src/types/GameState";
import {Figure} from "src/types/Figure";
import {calcKnightMoves} from "src/features/figures/calcMoves";

export class Knight extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcKnightMoves(gameState.grid, x, y);
    }
}

