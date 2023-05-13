import Side from 'enums/Side';
import jwt_decode from 'jwt-decode';
import { Socket } from 'socket.io-client';
import { joinGame } from '../../services/api/game';
import { createGameSocket } from '../../services/socket';

export default async function (gameId: string): Promise<{ socket: Socket; playerSide?: Side }> {
  let token = localStorage.getItem(gameId);
  if (!token) {
    const {
      data: { accessToken },
    } = await joinGame(gameId);
    token = accessToken;
    if (token) {
      localStorage.setItem(gameId, token);
    }
  }
  const socket = await createGameSocket(gameId, token);
  let playerSide;
  if (token) {
    const payload = jwt_decode<{ side: Side }>(token);
    playerSide = payload.side;
  }
  return { socket, playerSide };
}
