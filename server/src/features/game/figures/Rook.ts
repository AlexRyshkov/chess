import {GameState} from "src/features/game/types/GameState";
import {Figure} from "src/features/game/figures/Figure";
import {calcStraightMoves} from "src/features/game/figures/calcMoves";

export class Rook extends Figure {
    name: string = 'Rook';


    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcStraightMoves(gameState.grid, x, y);
    }
}


