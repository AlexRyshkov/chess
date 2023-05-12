import { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type FigureType from 'types/Figure';
import Grid from 'types/Grid';
import { GameContext } from '../../../features/game/GameProvider';
import Figure from '../../Figure';

export type FigureItem = { figure: FigureType; x: number; y: number };

interface Props {
  grid: Grid;
  x: number;
  y: number;
  isHighlighted: boolean;
}

function Cell({ grid, x, y, isHighlighted }: Props) {
  const { dragAllowedCells, makeMove, currentSideMove, playerSide } = useContext(GameContext);
  const figure = grid[x][y];
  const isAllowedToMove = dragAllowedCells?.some(([x1, y1]) => x === x1 && y === y1);

  const [, drop] = useDrop(
    () => ({
      accept: 'Figure',
      canDrop: () => isAllowedToMove,
      drop: (item: FigureItem) => makeMove([item.x, item.y], [x, y]),
    }),
    [isAllowedToMove, makeMove],
  );

  const [, drag] = useDrag(
    () => ({
      type: 'Figure',
      item: { figure, x, y },
    }),
    [figure, x, y, currentSideMove, playerSide],
  );

  return (
    <div
      ref={drop}
      style={{
        background: (x + y) % 2 === 0 ? 'white' : 'grey',
        ...(isHighlighted && { background: 'green' }),
        ...(isAllowedToMove && { background: 'yellow' }),
      }}
    >
      {figure && <Figure figure={figure} ref={drag} />}
    </div>
  );
}

export default Cell;
