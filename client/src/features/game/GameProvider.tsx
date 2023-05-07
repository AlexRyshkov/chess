import { createContext, ReactElement, useCallback, useEffect, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import { FigureItem } from '../../components/Figure';
import jsonGameStateToClass from '../../jsonGameStateToClass';
import { Figure, Grid, Side } from '../figures/figure';
import { createCastlingGrid, createDefaultGrid } from '../grids';
import getGameSocket from './getGameSocket';

export const GameContext = createContext<{
  grid: Grid;
  playerSide: Side;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
  dragAllowedCells: [number, number][];
  makeMove: (from: [number, number], to: [number, number]) => void;
}>({
  grid: createDefaultGrid(),
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

export type History = { figure: Figure; from: [number, number]; to: [number, number] }[];

export type GameState = {
  grid: Grid;
  currentSideMove: Side;
  isCheck: boolean;
  isMate: boolean;
  history: History;
};

const newGameState: GameState = {
  grid: createCastlingGrid(),
  currentSideMove: Side.WHITE,
  history: [],
  isCheck: false,
  isMate: false,
};

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [gameState, setGameState] = useState<GameState>(newGameState);
  const [socket, setSocket] = useState<Socket>();
  const [dragAllowedCells, setDragAllowedCells] = useState<[number, number][]>([]);
  const [playerSide, setPlayerSide] = useState<Side>(Math.random() > 0.5 ? Side.WHITE : Side.BLACK);
  const dragInfo = useDragLayer<FigureItem>((monitor) => monitor.getItem());

  const { grid, currentSideMove, history, isCheck, isMate } = gameState;
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      const socket = await getGameSocket(id);
      console.log(socket);

      socket.on('connect', () => {
        console.log('connected to server');
      });

      socket.on('state', (data) => {
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
      setDragAllowedCells(dragInfo.figure.getAllowedMoves(gameState, dragInfo.x, dragInfo.y));
    } else {
      setDragAllowedCells([]);
    }
  }, [dragInfo]);

  const makeMove = useCallback(
    ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
      socket?.emit('move', { fromX, fromY, toX, toY }, (gameState: any) => {
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
