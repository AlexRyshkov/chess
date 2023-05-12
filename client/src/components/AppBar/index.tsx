import { AppBar as MuiAppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <MuiAppBar>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Chess app
        </Typography>
        <Button color='inherit' onClick={() => navigate('/')}>
          New game
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
