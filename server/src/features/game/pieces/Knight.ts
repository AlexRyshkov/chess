import PieceName from "src/features/game/enums/PieceName";
import { calcKnightMoves } from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";
import Coords from "src/features/game/types/Coords";

export default class Knight extends Piece {
  name = PieceName.knight;

  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    return calcKnightMoves(gameState.grid, coords);
  }
}
