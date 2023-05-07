import { useContext } from 'react';
import Board from '../../components/Board';
import History from '../../components/History';
import GameProvider, { GameContext } from './GameProvider';

const Game = () => {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
};

const GameContent = () => {
  const { currentSideMove, isCheck, isMate, playerSide } = useContext(GameContext);

  return (
    <div style={{ display: 'flex', gridGap: 10 }}>
      <Board />
      Your side: {playerSide?.toString()} <br />
      Current turn: {currentSideMove} <br />
      {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br />
      {isMate ? (playerSide === currentSideMove ? 'You lost' : 'You win') : ''}
      <History />
    </div>
  );
};

export default Game;
