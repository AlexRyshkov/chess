import { io, Socket } from 'socket.io-client';
import GameStateData from 'types/GameStateData';
import MoveData from 'types/MoveData';

const URL = process.env.REACT_APP_WS_URL;

interface ServerToClientEvents {
  state: (data: GameStateData) => void;
}

interface ClientToServerEvents {
  move: (data: MoveData, callback: (response: GameStateData) => void) => void;
}

export const createGameSocket = (
  namespace: string,
  token: string | null,
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  return io(`${URL}/${namespace}`, { auth: { token }, autoConnect: true });
};
