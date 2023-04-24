import {io, Socket} from 'socket.io-client';

const URL = "ws://localhost:3002";

export const createGameSocket = (namespace: string, token: string): Socket => {
    return io(`${URL}/${namespace}`, {auth: {token}, autoConnect:true });
}
