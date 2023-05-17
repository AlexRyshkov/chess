import { Box, Button, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CenteredContainer from 'components/CenteredContainer';
import SelectionSide from '../../enums/SelectionSide';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createNewGame } from '../../services/api/game';

const StartMenu = () => {
  const navigate = useNavigate();
  const [side, setSide] = useState<SelectionSide>(SelectionSide.White);

  const startGame = async () => {
    const {
      data: { id, accessToken },
    } = await createNewGame(side);
    localStorage.setItem(id, accessToken);
    navigate(`/game/${id}`);
  };

  const handleSide = (event: React.MouseEvent<HTMLElement>, newSide: SelectionSide) => {
    if (newSide !== null) {
      setSide(newSide);
    }
  };

  return (
    <CenteredContainer>
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
            <ToggleButton value={SelectionSide.White}>White</ToggleButton>
            <ToggleButton value={SelectionSide.Black}>Black</ToggleButton>
            <ToggleButton value={SelectionSide.Random}>Random</ToggleButton>
          </ToggleButtonGroup>

          <Button variant='contained' onClick={startGame}>
            Start game
          </Button>
        </Box>
      </Paper>
    </CenteredContainer>
  );
};

export default StartMenu;
