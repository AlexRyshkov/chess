import { Box } from '@mui/material';
import Piece from '../../Piece';
import { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type PieceType from '../../../types/Piece';
import { GameContext } from '../../../features/game/GameProvider';
import Coords from "../../../types/Coords";

export type PieceItem = {
  piece: PieceType;
  x: number;
  y: number;
  allowedCells: Coords[];
};

interface Props {
  piece: PieceType | null;
  x: number;
  y: number;
  isHighlighted?: boolean;
}

function Cell({ piece, x, y, isHighlighted }: Props) {
  const { makeMove, allowedMoves } = useContext(GameContext);

  const [, drag] = useDrag(
    () => ({
      type: 'piece',
      item: { piece: piece, x, y, allowedCells: allowedMoves[`[${x}, ${y}]`] },
    }),
    [piece, x, y, allowedMoves],
  );

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'piece',
      canDrop: (item: PieceItem) => item.allowedCells?.some(({x:x1, y:y1}) => x === x1 && y === y1),
      drop: (item: PieceItem) => makeMove([item.x, item.y], [x, y]),
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
              piece !== null
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
      {piece && <Piece piece={piece} ref={drag} width='100%' height='100%' />}
    </Box>
  );
}

export default Cell;
