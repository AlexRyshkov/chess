import Figure from 'components/Figure';
import { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type FigureType from 'types/Figure';
import { GameContext } from '../../../features/game/GameProvider';

export type FigureItem = {
  figure: FigureType;
  x: number;
  y: number;
  allowedCells: [number, number][];
};

interface Props {
  figure: FigureType | null;
  x: number;
  y: number;
  isHighlighted?: boolean;
}

function Cell({ figure, x, y, isHighlighted }: Props) {
  const { makeMove, allowedMoves } = useContext(GameContext);

  const [, drag] = useDrag(
    () => ({
      type: 'Figure',
      item: { figure, x, y, allowedCells: allowedMoves[`[${x}, ${y}]`] },
    }),
    [figure, x, y, allowedMoves],
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'Figure',
      canDrop: (item: FigureItem) => item.allowedCells?.some(([x1, y1]) => x === x1 && y === y1),
      drop: (item: FigureItem) => makeMove([item.x, item.y], [x, y]),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [makeMove],
  );

  return (
    <div
      ref={drop}
      style={{
        background: (x + y) % 2 === 0 ? 'white' : 'grey',
        ...(isHighlighted && { background: 'green' }),
        ...(!isOver && canDrop && { background: 'yellow' }),
        ...(isOver && canDrop && { background: 'blue' }),
      }}
    >
      {figure && <Figure figure={figure} ref={drag} />}
    </div>
  );
}

export default Cell;
