import Side from 'enums/Side';
import Grid from './Grid';
import History from './History';
import Coords from "./Coords";

type GameStateData = {
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: { [key: string]: Coords[] };
};

export default GameStateData;
