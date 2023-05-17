import PieceName from "src/features/game/enums/PieceName";
import Side from "src/features/game/enums/Side";
import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Piece from "../pieces/Piece";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";

export default (pieceName: PieceName, side: Side): Piece => {
  if (pieceName === PieceName.pawn) return new Pawn(side);
  if (pieceName === PieceName.rook) return new Rook(side);
  if (pieceName === PieceName.knight) return new Knight(side);
  if (pieceName === PieceName.bishop) return new Bishop(side);
  if (pieceName === PieceName.queen) return new Queen(side);
  if (pieceName === PieceName.king) return new King(side);
};
