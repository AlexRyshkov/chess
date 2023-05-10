import { useContext } from 'react';
import Side from 'shared/enums/side';
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
  const { currentSideMove, isCheck, isMate, playerSide, grid, history } = useContext(GameContext);
  const lastMove = history[history.length - 1];

  return (
    <div style={{ display: 'flex', gridGap: 10 }}>
      <Board
        grid={grid}
        flipped={playerSide !== Side.BLACK}
        highlightedCells={lastMove ? [lastMove.from, lastMove.to] : []}
      />
      Your side: {playerSide?.toString()} <br />
      Current turn: {currentSideMove} <br />
      {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br />
      {isMate ? (playerSide === currentSideMove ? 'You lost' : 'You win') : ''}
      <History />
    </div>
  );
};

export default Game;
