import PieceName from "src/features/game/enums/PieceName";
import { calcDiagonalMoves, calcStraightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";
import Coords from "src/features/game/types/Coords";

export default class Queen extends Piece {
  name = PieceName.queen;

  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    return [
      ...calcStraightMoves(gameState.grid, coords),
      ...calcDiagonalMoves(gameState.grid, coords),
    ];
  }
}
