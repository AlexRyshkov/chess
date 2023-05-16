import Piece from './Piece';

type History = {
  figure: Piece;
  from: [number, number];
  to: [number, number];
}[];

export default History;
