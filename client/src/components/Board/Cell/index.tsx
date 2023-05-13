import { Box } from '@mui/material';
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
    <Box ref={drop} position='relative' bgcolor={(x + y) % 2 === 0 ? '#f0d9b5' : '#b58863'}>
      {!isOver && canDrop && (
        <Box
          width='100%'
          height='100%'
          position='absolute'
          sx={{
            background:
              figure !== null
                ? 'radial-gradient(transparent 0%, transparent 79%, rgba(20, 85, 0, 0.3) 80%)'
                : 'radial-gradient(rgba(20, 85, 30, 0.5) 19%, rgba(0, 0, 0, 0) 20%)',
          }}
        />
      )}
      {isOver && canDrop && (
        <Box position='absolute' width='100%' height='100%' bgcolor='rgba(155,199,0,.41)' />
      )}
      {isHighlighted && (
        <Box position='absolute' width='100%' height='100%' bgcolor='rgba(155,199,0,.41)' />
      )}
      {figure && <Figure figure={figure} ref={drag} />}
    </Box>
  );
}

export default Cell;
