import { styled } from '@mui/material';
import { forwardRef, ImgHTMLAttributes } from 'react';
import type FigureType from 'types/Figure';
import ImageConfig from './imageConfig';

const FigureIcon = styled('img')`
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

interface Props {
  figure: FigureType;
}

const Figure = forwardRef<any, Props & ImgHTMLAttributes<HTMLImageElement>>(
  ({ figure, ...rest }, ref) => (
    <FigureIcon ref={ref} src={ImageConfig[figure.side][figure.name]} {...rest} />
  ),
);

Figure.displayName = 'Figure';

export default Figure;
