import Side from 'enums/Side';
import { createContext, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import GameState from 'types/GameState';
import Grid from 'types/Grid';
import pieceMoveSound from '../../piece-move-sound.mp3';
import History from '../../types/History';
import connectToGame from './connectToGame';

export const GameContext = createContext<{
  grid: Grid;
  playerSide?: Side;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  allowedMoves: any;
  makeMove: (from: [number, number], to: [number, number]) => void;
}>({
  grid: [],
  currentSideMove: Side.WHITE,
  playerSide: Side.WHITE,
  isCheck: false,
  isMate: false,
  history: [],
  allowedMoves: {},
  makeMove: () => {
    return;
  },
});

const newGameState: GameState = {
  grid: [],
  currentSideMove: Side.WHITE,
  allowedMoves: {},
  history: [],
  isCheck: false,
  isMate: false,
};

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [gameState, setGameState] = useState<GameState>(newGameState);
  const [socket, setSocket] = useState<Socket>();
  const [playerSide, setPlayerSide] = useState<Side>();

  const audio = useMemo(() => new Audio(pieceMoveSound), []);

  const { grid, currentSideMove, history, isCheck, isMate } = gameState;
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      const { socket, playerSide } = await connectToGame(id);
      if (playerSide) {
        setPlayerSide(playerSide);
      }

      socket.on('connect', () => {
        console.log('connected to server');
      });

      socket.on('state', (data: GameState) => {
        audio.play();
        setGameState(data);
      });

      socket.on('disconnect', (reason) => {
        console.log('disconnected from server');
      });

      setSocket(socket);

      return () => {
        socket.removeAllListeners('connect');
        socket.removeAllListeners('state');
        socket.removeAllListeners('disconnect');
        socket.disconnect();
      };
    })();
  }, [id]);

  const makeMove = useCallback(
    ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
      socket?.emit('move', { fromX, fromY, toX, toY }, (data: GameState) => {
        audio.play();
        setGameState(data);
      });
    },
    [audio, gameState, socket],
  );

  return (
    <GameContext.Provider
      value={{
        grid,
        makeMove,
        currentSideMove,
        history,
        isCheck,
        isMate,
        playerSide,
        allowedMoves: gameState.allowedMoves,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
