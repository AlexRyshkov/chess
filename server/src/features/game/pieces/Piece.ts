import PieceName from "src/features/game/enums/PieceName";
import Side from "../enums/Side";
import { filterMovesByCheck } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Coords from "src/features/game/types/Coords";

export default abstract class Piece {
  side: Side;
  abstract name: PieceName;

  constructor(side: Side) {
    this.side = side;
  }

  abstract getMoves(gameState: GameStateData, coords: Coords): Coords[];

  getAttackCells(gameState: GameStateData, coords: Coords): Coords[] {
    return this.getMoves(gameState, coords);
  }

  getAllowedMoves(gameState: GameStateData, coords: Coords): Coords[] {
    return filterMovesByCheck(
      gameState,
      coords,
      this.getMoves(gameState, coords)
    );
  }
}
