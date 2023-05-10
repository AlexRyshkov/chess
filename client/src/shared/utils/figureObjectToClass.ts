import Bishop from "../figures/Bishop";
import Figure from "../figures/Figure";
import King from "../figures/King";
import Knight from "../figures/Knight";
import Pawn from "../figures/Pawn";
import Queen from "../figures/Queen";
import Rook from "../figures/Rook";

export default (object: Figure): Figure | null => {
  if (object?.name === "Pawn") return new Pawn(object.side);
  if (object?.name === "Rook") return new Rook(object.side);
  if (object?.name === "Knight") return new Knight(object.side);
  if (object?.name === "Bishop") return new Bishop(object.side);
  if (object?.name === "Queen") return new Queen(object.side);
  if (object?.name === "King") return new King(object.side);

  return null;
};
