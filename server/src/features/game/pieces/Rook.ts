import PieceName from "src/features/game/enums/PieceName";
import { calcStraightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";
import Coords from "src/features/game/types/Coords";

export default class Rook extends Piece {
  name = PieceName.rook;

  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    return calcStraightMoves(gameState.grid, coords);
  }
}
