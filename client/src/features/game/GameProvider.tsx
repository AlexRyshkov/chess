import { createContext, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import { useParams } from 'react-router';
import Side from 'shared/enums/side';
import GameState from 'shared/types/GameState';
import Grid from 'shared/types/Grid';
import History from 'shared/types/History';
import { Socket } from 'socket.io-client';
import { FigureItem } from '../../components/Figure';
import pieceMoveSound from '../../piece-move-sound.mp3';
import jsonGameStateToClass from '../../shared/utils/gameStateObjectToClass';
import connectToGame from './connectToGame';

export const GameContext = createContext<{
  grid: Grid;
  playerSide?: Side;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  dragAllowedCells: [number, number][];
  makeMove: (from: [number, number], to: [number, number]) => void;
}>({
  grid: [],
  currentSideMove: Side.WHITE,
  playerSide: Side.WHITE,
  isCheck: false,
  isMate: false,
  history: [],
  dragAllowedCells: [],
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
  const [dragAllowedCells, setDragAllowedCells] = useState<[number, number][]>([]);
  const [playerSide, setPlayerSide] = useState<Side>();
  const dragInfo = useDragLayer<FigureItem>((monitor) => monitor.getItem());

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

      socket.on('state', (data) => {
        audio.play();
        setGameState(jsonGameStateToClass(data));
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

  useEffect(() => {
    if (dragInfo?.figure) {
      setDragAllowedCells(gameState.allowedMoves[`[${dragInfo.x}, ${dragInfo.y}]`]);
    } else {
      setDragAllowedCells([]);
    }
  }, [dragInfo]);

  const makeMove = useCallback(
    ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
      socket?.emit('move', { fromX, fromY, toX, toY }, (gameState: any) => {
        audio.play();
        setGameState(jsonGameStateToClass(gameState));
      });
    },
    [gameState, socket],
  );

  return (
    <GameContext.Provider
      value={{
        grid,
        dragAllowedCells,
        makeMove,
        currentSideMove,
        history,
        isCheck,
        isMate,
        playerSide,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
