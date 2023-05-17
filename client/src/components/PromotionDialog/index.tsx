import { Box, Button, Dialog, Typography } from '@mui/material';
import Piece from '../Piece';
import FigureEnum from 'enums/PieceName';
import { GameContext } from 'features/game/GameProvider';
import { useContext } from 'react';

interface Props {
  open: boolean;
  onSubmit: (figure: FigureEnum) => void;
}

const promotionFigures = [FigureEnum.Rook, FigureEnum.Knight, FigureEnum.Bishop, FigureEnum.Queen];

const PromotionDialog = ({ open, onSubmit }: Props) => {
  const { playerSide } = useContext(GameContext);

  if (!playerSide) {
    return null;
  }

  return (
    <Dialog open={open}>
      <Box padding={2}>
        <Typography textAlign='center' variant='h5'>
          Select promition
        </Typography>
        {promotionFigures.map((figure) => (
          <Button key={figure} onClick={() => onSubmit(figure)}>
            <Piece piece={{ name: figure, side: playerSide }} width={100} height={100} />
          </Button>
        ))}
      </Box>
    </Dialog>
  );
};

export default PromotionDialog;
