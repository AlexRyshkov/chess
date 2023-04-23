import {GameState} from "src/types/GameState";
import {Side} from "src/enums/Side";
import {filterMovesByCheck} from "src/features/figures/calcMoves";

export abstract class Figure {
    side: Side;

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