import { useContext } from 'react';
import { GameContext } from '../../features/game/GameProvider';
import Cell from './Cell';

const Board = () => {
  const { grid } = useContext(GameContext);

  return (
    <div className='grid'>
      {Array.isArray(grid) &&
        grid.map((row, x: number) =>
          row.map((cell, y: number) => <Cell grid={grid} key={`${x}${y}`} x={x} y={y} />),
        )}
    </div>
  );
};

export default Board;
