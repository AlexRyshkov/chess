import {GameState} from "src/features/game/types/GameState";
import {Side} from "src/features/game/enums/Side";
import {filterMovesByCheck} from "src/features/game/figures/calcMoves";

export abstract class Figure {
    side: Side;
    abstract name: string;

    constructor(side: Side) {
        this.side = side;
    }

    abstract getAllMoves(gameState: GameState, x: number, y: number): [number, number][];

    getAllowedMoves(gameState: GameState, x: number, y: number): [number, number][] {
        return filterMovesByCheck(gameState, x, y, this.getAllMoves(gameState, x, y));
    }

    getAllowedAttackCells(gameState: GameState, x: number, y: number): [number, number][] {
        return this.getAllMoves(gameState, x, y);
    }
}