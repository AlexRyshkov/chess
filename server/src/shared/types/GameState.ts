import SIDE from "../enums/side";
import AllowedMoves from "./AllowedMoves";
import Grid from "./Grid";
import History from "./History";

type GameState = {
  grid: Grid;
  currentSideMove: SIDE;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: AllowedMoves;
};

export default GameState;
