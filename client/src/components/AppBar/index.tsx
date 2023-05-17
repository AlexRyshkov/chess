import { AppBar as MuiAppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <MuiAppBar position='static'>
      <Toolbar>
        <Button color='inherit' onClick={() => navigate('/')}>
          New game
        </Button>
        <Box flex={1} />
        <Typography variant='h6' component='div'>
          Chess app
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
