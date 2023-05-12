import { Box } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactElement;
}

const CenteredContainer = ({ children }: Props) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
      {children}
    </Box>
  );
};

export default CenteredContainer;
