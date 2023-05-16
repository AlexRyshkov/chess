import { Box, Stack, styled, useTheme } from '@mui/material';
import GameStatus from 'components/GameStatus';
import History from 'components/History';
import PromotionDialog from 'components/PromotionDialog';
import PieceName from '../../enums/PieceName';
import Side from 'enums/Side';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useCallback, useContext } from 'react';
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
  const { playerSide, grid, history, currentSideMove, isCheck, isMate, promotionStatus, promote } =
    useContext(GameContext);

  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const lastMove = history[history.length - 1];

  const promoteSubmit = useCallback((figure: PieceName) => promote(figure), [promote]);

  return (
    <>
      <PromotionDialog open={promotionStatus.isPending} onSubmit={promoteSubmit} />
      <Box
        display='flex'
        justifyContent='center'
        margin={theme.spacing(2)}
        columnGap={theme.spacing(2)}
      >
        <BoardContainer size={Math.min(width, height) - 1}>
          <Board
            grid={grid}
            flipped={playerSide !== Side.Black}
            highlightedCells={lastMove ? [lastMove.from, lastMove.to] : []}
          />
        </BoardContainer>
        <Stack width={320} spacing={1}>
          <Box height='50%'>
            <History history={history} />
          </Box>
          <Box>
            <GameStatus
              playerSide={playerSide}
              currentSideMove={currentSideMove}
              isCheck={isCheck}
              isMate={isMate}
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Game;
