import { styled } from '@mui/material';
import { forwardRef, ImgHTMLAttributes } from 'react';
import type PieceType from '../../types/Piece';
import ImageConfig from './imageConfig';

const PieceIcon = styled('img')`
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

interface Props {
  piece: PieceType;
}

const Piece = forwardRef<any, Props & ImgHTMLAttributes<HTMLImageElement>>(
  ({ piece, ...rest }, ref) => (
    <PieceIcon ref={ref} src={ImageConfig[piece.side][piece.name]} {...rest} />
  ),
);

Piece.displayName = 'Piece';

export default Piece;
