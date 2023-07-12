import jwt from "jsonwebtoken";
import { Namespace } from "socket.io";
import convertPiecesToClassInstances from "src/features/game/utils/convertPiecesToClassInstances";
import GameState from "src/models/GameState";
import Session from "src/models/Session";
import { io } from "src/services/socketService";
import move from "./moves/move";
import GameStateData from "./types/GameStateData";
import MoveData from "./types/MoveData";

interface ServerToClientEvents {
  state: (data: GameStateData) => void;
}

interface ClientToServerEvents {
  move: (data: MoveData, callback: (response: GameStateData) => void) => void;
}

interface InterServerEvents {}

interface SocketData {}

export function createGameSessionSocket(session: Session): Namespace {
  const gameNamespace: Namespace<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  > = io.of(session.id);

  gameNamespace.on("connection", async (socket) => {
    const payload = jwt.verify(
      socket.handshake.auth.token,
      process.env.SECRET_KEY
    );

    const gameStateRecord = await GameState.query().findById(session.id);
    socket.emit("state", gameStateRecord.data);

    socket.on("move", async (moveData, callback) => {
      const gameStateRecord = await GameState.query().findById(session.id);

      if (payload.side !== gameStateRecord.data.currentSideMove) {
        return;
      }

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
