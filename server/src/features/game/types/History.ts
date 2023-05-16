import Piece from "src/features/game/pieces/Piece";

type History = {
  piece: Piece;
  from: [number, number];
  to: [number, number];
}[];

export default History;
