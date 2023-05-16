import { Namespace } from "socket.io";
import convertPiecesToClassInstances from "src/features/game/utils/convertPiecesToClassInstances";
import GameState from "src/models/GameState";
import Session from "src/models/Session";
import { io } from "src/services/socketService";
import move from "./moves/move";

export function createGameSessionSocket(session: Session): Namespace {
  const gameNamespace = io.of(session.id);

  // gameNamespace.use((socket, next) => {
  //     const token = socket.handshake.auth.token;
  //     next();
  //     // if (token === session.access_token) {
  //     //     next();
  //     // }
  //     // next(new Error("invalid token"));
  // });

  gameNamespace.on("connection", async (socket) => {
    const gameStateRecord = await GameState.query().findById(session.id);
    socket.emit("state", gameStateRecord.data);

    socket.on("move", async (moveData, callback) => {
      const gameStateRecord = await GameState.query().findById(session.id);
      const gameState = convertPiecesToClassInstances(gameStateRecord.data);
      const newGameState = move(moveData, gameState);
      await GameState.query()
        .patch({ data: newGameState })
        .findById(session.id);
      socket.broadcast.emit("state", newGameState);
      callback(newGameState);
    });
  });

  console.log(`created socket for session: ${session.id}`);
  return gameNamespace;
}

Session.query().then((sessions) => {
  for (const session of sessions) {
    createGameSessionSocket(session);
  }
});
