import React, { useContext } from 'react';
import Cell from './Cell';
import { GameContext } from '../../features/game/GameProvider';

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
