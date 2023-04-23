import {GameState} from "src/types/GameState";
import {Figure} from "src/types/Figure";
import {calcStraightMoves} from "src/features/figures/calcMoves";

export class Rook extends Figure {
    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcStraightMoves(gameState.grid, x, y);
    }
}


