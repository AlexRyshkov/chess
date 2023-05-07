import { SIDE_SELECTION } from 'enums/sideSelection';
import api from './index';

export const createNewGame = (side: SIDE_SELECTION) =>
  api.get<any>('/game/new', { params: { side } });

export const joinGame = (id: string) => api.get<any>(`/game/${id}/join`);
