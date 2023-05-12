import CenteredContainer from 'components/CenteredContainer';
import Side from 'enums/Side';
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

const GameContent = () => {
  const { currentSideMove, isCheck, isMate, playerSide, grid, history } = useContext(GameContext);
  const lastMove = history[history.length - 1];

  return (
    <CenteredContainer>
      <Board
        grid={grid}
        flipped={playerSide !== Side.BLACK}
        highlightedCells={lastMove ? [lastMove.from, lastMove.to] : []}
      />
      {/* Your side: {playerSide?.toString()} <br />
      Current turn: {currentSideMove} <br />
      {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br />
      {isMate ? (playerSide === currentSideMove ? 'You lost' : 'You win') : ''}
      <History /> */}
    </CenteredContainer>
  );
};

export default Game;
