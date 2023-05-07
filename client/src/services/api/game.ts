import api from './index';

export const createNewGame = () => api.get<any>('/game/new');

export const joinGame = (id: string) => api.get<any>(`/game/${id}/join`);
