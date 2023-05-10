import SIDE from '../enums/side';
import Grid from './Grid';
import History from './History';

type GameState = {
  grid: Grid;
  currentSideMove: SIDE;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: { [key: string]: [number, number][] };
};

export default GameState;
