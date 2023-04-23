import React, { useContext } from 'react';
import './App.css';
import Board from './components/Board';
import { GameContext } from './features/game/GameProvider';
import History from './components/History';

function App() {
  const { currentSideMove, isCheck, isMate } = useContext(GameContext);

  return (
    <div style={{ display: 'flex', gridGap: 10 }}>
      <Board />
      Current turn: {currentSideMove} <br />
      {isMate ? 'Mate!' : isCheck ? 'Check!' : ''} <br />
      <History />
    </div>
  );
}

export default App;
