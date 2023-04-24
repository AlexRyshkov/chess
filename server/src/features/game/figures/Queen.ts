import {GameState} from "src/features/game/types/GameState";
import {Figure} from "src/features/game/figures/Figure";
import {calcDiagonalMoves, calcStraightMoves} from "src/features/game/figures/calcMoves";

export class Queen extends Figure {
    name: string = 'Queen';


    getAllMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return [...calcStraightMoves(gameState.grid, x, y), ...calcDiagonalMoves(gameState.grid, x, y)];
    }
}

