import { styled } from '@mui/material';
import { forwardRef } from 'react';
import type FigureType from 'types/Figure';
import ImageConfig from './imageConfig';

const FigureIcon = styled('img')`
  width: 100%;
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

interface Props {
  figure: FigureType;
}

const Figure = forwardRef<any, Props>(({ figure }, ref) => (
  <FigureIcon ref={ref} src={ImageConfig[figure.side][figure.name]} />
));

Figure.displayName = 'Figure';

export default Figure;
