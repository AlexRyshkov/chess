import PieceName from '../../enums/PieceName';
import Side from 'enums/Side';
import { createContext, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { Socket } from 'socket.io-client';
import GameStateData from 'types/GameStateData';
import Grid from 'types/Grid';
import PromotionStatus from 'types/Promotion';
// @ts-ignore
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
  promotionStatus: PromotionStatus;
  promote: (piece: PieceName) => void;
  makeMove: (from: [number, number], to: [number, number]) => void;
}>({
  grid: [],
  currentSideMove: Side.White,
  playerSide: Side.White,
  isCheck: false,
  isMate: false,
  history: [],
  promotionStatus: { isPending: false },
  allowedMoves: {},
  promote: () => {
    return;
  },
  makeMove: () => {
    return;
  },
});

const newGameState: GameStateData = {
  grid: [],
  currentSideMove: Side.White,
  allowedMoves: {},
  history: [],
  isCheck: false,
  isMate: false,
};

const GameProvider = ({ children }: { children: ReactElement }) => {
  const [gameState, setGameState] = useState<GameStateData>(newGameState);
  const [socket, setSocket] = useState<Socket>();
  const [playerSide, setPlayerSide] = useState<Side>();
  const [promotionStatus, setPromotionStatus] = useState<PromotionStatus>({ isPending: false });

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

      socket.on('state', (data: GameStateData) => {
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
      const piece = grid[fromX][fromY]!;
      if (piece.name === PieceName.Pawn && (toX === 0 || toX === grid.length - 1)) {
        setPromotionStatus({
          isPending: true,
          from: { x: fromX, y: fromY },
          to: { x: toX, y: toY },
        });
        return;
      }

      socket?.emit(
        'move',
        { from: { x: fromX, y: fromY }, to: { x: toX, y: toY } },
        (data: GameStateData) => {
          if (data) {
            audio.play();
            setGameState(data);
          }
        },
      );
    },
    [audio, gameState, socket],
  );

  const promote = useCallback(
    (piece: PieceName) => {
      const { x: fromX, y: fromY } = promotionStatus.from!;
      const { x: toX, y: toY } = promotionStatus.to!;
      socket?.emit(
        'move',
        { fromX, fromY, toX, toY, promotionPiece: piece },
        (data: GameStateData) => {
          audio.play();
          setGameState(data);
          setPromotionStatus({ isPending: false });
        },
      );
    },
    [promotionStatus, audio],
  );

  console.log(gameState);

  return (
    <GameContext.Provider
      value={{
        grid,
        makeMove,
        promote,
        currentSideMove,
        history,
        isCheck,
        isMate,
        playerSide,
        promotionStatus,
        allowedMoves: gameState.allowedMoves,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
