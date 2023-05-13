import { AppBar as MuiAppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <MuiAppBar position='static'>
      <Toolbar>
        <Button sx={{ flexGrow: 1 }} color='inherit' onClick={() => navigate('/')}>
          New game
        </Button>
        <Typography variant='h6' component='div'>
          Chess app
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
