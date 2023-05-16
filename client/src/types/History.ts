import Piece from './Piece';
import Coords from "./Coords";

type History = {
  piece: Piece;
  from: Coords;
  to: Coords;
}[];

export default History;
