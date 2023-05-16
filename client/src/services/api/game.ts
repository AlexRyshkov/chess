import SelectionSide from '../../enums/SelectionSide';
import api from './index';

export const createNewGame = (side: SelectionSide) =>
  api.get<any>('/game/new', { params: { side } });

export const joinGame = (id: string) => api.get<any>(`/game/${id}/join`);
