import api from "./index";

export const createNewGame = () => api.get<any>('/game/new');
