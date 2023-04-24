import React, {useContext} from 'react';
import {useDrag} from 'react-dnd';
import {Figure as FigureType} from '../../features/figures/figure';
import {GameContext} from '../../features/game/GameProvider';

const FigureImagesConfig: any = {
  white: {
    Pawn: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    Bishop: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    Knight: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    Rook: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    Queen: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    King: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
  },
  black: {
    Pawn: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
    Bishop: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    Knight: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    Rook: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    Queen: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    King: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
  },
};

export type FigureItem = { figure: FigureType; x: number; y: number };

export default function Figure({ figure, x, y }: { figure: FigureType; x: number; y: number }) {
  const { currentSideMove, playerSide } = useContext(GameContext);

  const [_, drag] = useDrag(
    () => ({
      type: 'Figure',
      item: { figure, x, y },
      canDrag: () => playerSide === currentSideMove && figure?.side === currentSideMove,
    }),
    [figure, x, y, currentSideMove, playerSide],
  );

  return (
    <img width='100%' ref={drag} src={FigureImagesConfig[figure.side][figure.name]} />
  );
}
