import { Socket } from 'socket.io-client';
import { joinGame } from '../../services/api/game';
import { createGameSocket } from '../../services/socket';

export default async function (gameId: string): Promise<Socket> {
  const tokenFromStorage = sessionStorage.getItem(gameId);
  if (tokenFromStorage) {
    return createGameSocket(gameId, tokenFromStorage);
  } else {
    const { data: token } = await joinGame(gameId);
    sessionStorage.setItem(gameId, token);
    return createGameSocket(gameId, token);
  }
}
