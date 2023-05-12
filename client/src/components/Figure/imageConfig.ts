import Figure from 'enums/Figure';
import Side from 'enums/Side';

const ImageConfig: { [key in Side]: { [key in Figure]: string } } = {
  [Side.WHITE]: {
    [Figure.Pawn]: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    [Figure.Bishop]: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    [Figure.Knight]: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    [Figure.Rook]: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    [Figure.Queen]: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    [Figure.King]: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
  },
  [Side.BLACK]: {
    [Figure.Pawn]: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
    [Figure.Bishop]: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    [Figure.Knight]: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    [Figure.Rook]: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    [Figure.Queen]: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    [Figure.King]: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
  },
};

export default ImageConfig;
