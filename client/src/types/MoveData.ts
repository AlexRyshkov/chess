import PieceName from '../enums/PieceName';
import Coords from './Coords';

type MoveData = {
  from: Coords;
  to: Coords;
  promotionPiece?: PieceName;
};

export default MoveData;
