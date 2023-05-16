import { Server } from "socket.io";

export let io: Server<any, any>;

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
}
