import React, {useContext} from 'react';
import {Grid} from '../../../features/figures/figure';
import {useDrop} from 'react-dnd';
import {GameContext} from '../../../features/game/GameProvider';
import Figure, {FigureItem} from '../../Figure';

function Cell({ grid, x, y }: { grid: Grid; x: number; y: number }) {
  const { dragAllowedCells, makeMove } = useContext(GameContext);
  const figure = grid[x][y];
  const isAllowedToMove = dragAllowedCells.some(([x1, y1]) => x === x1 && y === y1);

  const [_, drop] = useDrop(
    () => ({
      accept: 'Figure',
      canDrop: () => isAllowedToMove,
      drop: (item: FigureItem) => makeMove([item.x, item.y], [x, y]),
    }),
    [isAllowedToMove, makeMove],
  );

  return (
    <div
      ref={drop}
      style={{
        background: (x + y) % 2 === 0 ? 'white' : 'grey',
        ...(isAllowedToMove && { background: 'yellow' }),
      }}
    >
      {figure && <Figure figure={figure} x={x} y={y} />}
    </div>
  );
}

export default Cell;
