import Side from "../enums/Side";
import AllowedMoves from "./AllowedMoves";
import Grid from "./Grid";
import History from "./History";

type GameStateData = {
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: AllowedMoves;
};

export default GameStateData;
