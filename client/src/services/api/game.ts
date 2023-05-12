import SideSelection from 'enums/SideSelection';
import api from './index';

export const createNewGame = (side: SideSelection) =>
  api.get<any>('/game/new', { params: { side } });

export const joinGame = (id: string) => api.get<any>(`/game/${id}/join`);
