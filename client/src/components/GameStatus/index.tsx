import { Stack, Typography, useTheme } from '@mui/material';
import Side from 'enums/Side';

interface Props {
  playerSide?: Side;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
}

const GameStatus = ({ playerSide, currentSideMove, isCheck, isMate }: Props) => {
  const theme = useTheme();
  const isPlayerTurn = currentSideMove === playerSide;

  const getStatus = () => {
    if (isMate) {
      return (
        <Typography variant='body1' textAlign='center'>
          {isPlayerTurn ? 'You lost' : 'You win'}
        </Typography>
      );
    }

    return (
      <>
        <Typography variant='body1' textAlign='center'>
          {isPlayerTurn ? 'Your turn' : 'Waiting for opponent turn'}
        </Typography>
        {isPlayerTurn && isCheck && (
          <Typography color={theme.palette.error.main} variant='body1' textAlign='center'>
            Check!
          </Typography>
        )}
      </>
    );
  };

  return <Stack minWidth={320}>{getStatus()}</Stack>;
};

export default GameStatus;
