import Piece from "src/features/game/pieces/Piece";
import Coords from "src/features/game/types/Coords";

type History = {
  piece: Piece;
  from: Coords;
  to: Coords;
}[];

export default History;
