import {GameState} from "src/features/game/types/GameState";
import {Figure} from "src/features/game/figures/Figure";
import {calcKnightMoves} from "src/features/game/figures/calcMoves";

export class Knight extends Figure {
    name: string = 'Knight';


    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return calcKnightMoves(gameState.grid, x, y);
    }
}

