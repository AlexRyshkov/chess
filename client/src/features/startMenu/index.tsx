import { Box, Button, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import SIDE_SELECTION from 'shared/enums/selectionSide';
import { createNewGame } from '../../services/api/game';

const StartMenu = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<SIDE_SELECTION>(SIDE_SELECTION.WHITE);

  const startGame = async () => {
    const {
      data: { id, accessToken },
    } = await createNewGame(side);
    sessionStorage.setItem(id, accessToken);
    navigate(`/game/${id}`);
  };

  const handleSide = (event: React.MouseEvent<HTMLElement>, newSide: SIDE_SELECTION) => {
    setSide(newSide);
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      <Paper elevation={3}>
        <Box padding={2} display='flex' alignItems='center' flexDirection='column' rowGap={2}>
          <Typography variant='h5'>Create new game</Typography>
          <Typography variant='h6'>Select side</Typography>
          <ToggleButtonGroup
            value={side}
            exclusive
            onChange={handleSide}
            aria-label='text alignment'
          >
            <ToggleButton value={SIDE_SELECTION.WHITE}>White</ToggleButton>
            <ToggleButton value={SIDE_SELECTION.BLACK}>Black</ToggleButton>
            <ToggleButton value={SIDE_SELECTION.RANDOM}>Random</ToggleButton>
          </ToggleButtonGroup>

          <Button variant='contained' onClick={startGame}>
            Start game
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StartMenu;
