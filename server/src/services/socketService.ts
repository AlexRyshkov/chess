import { Namespace, Server } from "socket.io";
import { Side } from "src/features/game/enums/Side";
import { calcIsCheck, calcIsMate } from "src/features/game/figures/calcMoves";
import jsonGameStateToClass from "src/jsonGameStateToClass";
import GameState from "src/models/GameState";
import Session from "src/models/Session";

export default class SocketService {
  private ioInstance: Server;

  constructor(server: any) {
    this.ioInstance = new Server(server, {
      cors: {
        origin: "*",
      },
    });
  }

  createGameSessionSocket(session: Session): Namespace {
    const gameNamespace = this.ioInstance.of(session.id);

    gameNamespace.on("connection", async (socket) => {
      console.log(`connected to ${session.id}`);
      const gameState = await GameState.query().findById(session.id);
      socket.emit("state", gameState.data);

      socket.on("move", async (message, callback) => {
        const { fromX, fromY, toX, toY } = message;

        const gameStateRecord = await GameState.query().findById(session.id);
        const gameState = jsonGameStateToClass(gameStateRecord.data);
        const { grid, currentSideMove } = gameState;
        const figure = grid[fromX][fromY];

        const newGrid = grid.map((row) => row.slice());
        const oppositeSide =
          currentSideMove === Side.WHITE ? Side.BLACK : Side.WHITE;

        // passant check
        if (figure.name === "Pawn" && fromY !== toY) {
          newGrid[fromX][toY] = null;
        }

        // castling check
        if (figure.name === "King" && Math.abs(fromY - toY) === 2) {
          const castlingDirection = toY - fromY > 0 ? 1 : -1;
          const [rookX, rookY] = [
            toX,
            castlingDirection > 0 ? grid.length - 1 : 0,
          ];
          const rook = newGrid[rookX][rookY];
          newGrid[rookX][fromY + castlingDirection] = rook;
          newGrid[rookX][rookY] = null;
        }

        newGrid[toX][toY] = figure;
        newGrid[fromX][fromY] = null;

        const isCheck = calcIsCheck(
          { ...gameState, grid: newGrid },
          oppositeSide
        );

        const isMate = isCheck
          ? calcIsMate({ ...gameState, grid: newGrid }, oppositeSide)
          : false;

        const newGameState = {
          grid: newGrid,
          currentSideMove: oppositeSide,
          isCheck: false,
          isMate: false,
          history: [
            ...gameState.history,
            { from: [fromX, fromY], to: [toX, toY], figure: figure },
          ],
        };

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
}

// gameNamespace.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (token === session.access_token) {
//         console.log(999);
//         next();
//     }
//     next(new Error("invalid token"));
// });
