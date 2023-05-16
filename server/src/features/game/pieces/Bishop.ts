import PieceName from "src/features/game/enums/PieceName";
import { calcDiagonalMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";
import Coords from "src/features/game/types/Coords";

export default class Bishop extends Piece {
  name = PieceName.bishop;

  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    return calcDiagonalMoves(gameState.grid, coords);
  }
}
