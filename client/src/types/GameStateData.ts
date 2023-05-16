import Side from 'enums/Side';
import Grid from './Grid';
import History from './History';

type GameStateData = {
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: { [key: string]: [number, number][] };
};

export default GameStateData;
