import { Side } from 'features/figures/figure';
import jwt_decode from 'jwt-decode';
import { Socket } from 'socket.io-client';
import { joinGame } from '../../services/api/game';
import { createGameSocket } from '../../services/socket';

export default async function (gameId: string): Promise<{ socket: Socket; playerSide?: Side }> {
  let token = sessionStorage.getItem(gameId);
  if (!token) {
    const {
      data: { accessToken },
    } = await joinGame(gameId);
    token = accessToken;
    if (token) {
      sessionStorage.setItem(gameId, token);
    }
  }
  const socket = await createGameSocket(gameId, token);
  let playerSide;
  if (token) {
    const payload = jwt_decode<{ side: Side }>(token);
    playerSide = payload.side;
    console.log(payload);
  }
  return { socket, playerSide };
}
