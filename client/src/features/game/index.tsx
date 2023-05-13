import { Box, Paper, styled, useTheme } from '@mui/material';
import GameStatus from 'components/GameStatus';
import History from 'components/History';
import Side from 'enums/Side';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useContext } from 'react';
import Board from '../../components/Board';
import GameProvider, { GameContext } from './GameProvider';

const Game = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

const BoardContainer = styled(Box)<{ size: number }>`
  width: ${({ theme, size }) => `calc(${size}px - ${theme.spacing(4)})`};
  height: ${({ theme, size }) => `calc(${size}px - ${theme.spacing(4)})`};

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 860px;
    height: 860px;
  }
`;

const GameContent = () => {
  const { playerSide, grid, history, currentSideMove, isCheck, isMate } = useContext(GameContext);

  console.log(grid);
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const lastMove = history[history.length - 1];

  return (
    <Box
      display='flex'
      justifyContent='center'
      margin={theme.spacing(2)}
      columnGap={theme.spacing(2)}
    >
      <BoardContainer size={Math.min(width, height) - 1}>
        <Board
          grid={grid}
          flipped={playerSide !== Side.BLACK}
          highlightedCells={lastMove ? [lastMove.from, lastMove.to] : []}
        />
      </BoardContainer>
      <Paper elevation={3} sx={{ padding: theme.spacing(2) }}>
        <GameStatus
          playerSide={playerSide}
          currentSideMove={currentSideMove}
          isCheck={isCheck}
          isMate={isMate}
        />
        <Box overflow='hidden' height='80%'>
          <History />
        </Box>
      </Paper>
    </Box>
  );
};

export default Game;
