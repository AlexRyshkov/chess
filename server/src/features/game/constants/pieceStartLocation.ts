import Side from "src/features/game/enums/Side";
import PieceName from "../enums/PieceName";
import Coords from "../types/Coords";

const PieceStartLocation: {
  [key in Side]: { [key in PieceName]?: Coords | Coords[] };
} = {
  [Side.White]: {
    [PieceName.rook]: [
      { x: 0, y: 0 },
      { x: 0, y: 7 },
    ],
    [PieceName.king]: [{ x: 0, y: 3 }],
  },
  [Side.Black]: {
    [PieceName.rook]: [
      { x: 7, y: 0 },
      { x: 7, y: 7 },
    ],
    [PieceName.king]: { x: 7, y: 3 },
  },
};

export default PieceStartLocation;
