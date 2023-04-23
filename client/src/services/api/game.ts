import api from "./index";

export const createNewGame = () => api.get<Promise<{id: string}>>('/game/new');
