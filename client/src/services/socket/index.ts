import {io, Socket} from 'socket.io-client';

const URL = process.env.REACT_APP_WS_URL;

console.log(process.env.REACT_APP_WS_URL);

export const createGameSocket = (namespace: string, token: string): Socket => {
    return io(`${URL}/${namespace}`, { auth: {token}, autoConnect:true });
}
