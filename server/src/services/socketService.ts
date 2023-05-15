import { Namespace, Server } from "socket.io";
import { getAllowedMoves } from "src/features/game/GameManager";
import GameState from "src/models/GameState";
import Session from "src/models/Session";
import Side from "src/shared/enums/side";
import Bishop from "src/shared/figures/Bishop";
import Knight from "src/shared/figures/Knight";
import Queen from "src/shared/figures/Queen";
import Rook from "src/shared/figures/Rook";
import { calcIsCheck, calcIsMate } from "src/shared/logic/calcMoves";
import gameStateObjectToClass from "src/shared/utils/gameStateObjectToClass";

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

    gameNamespace.use((socket, next) => {
      const token = socket.handshake.auth.token;
      next();
      // if (token === session.access_token) {
      //     next();
      // }
      // next(new Error("invalid token"));
    });

    gameNamespace.on("connection", async (socket) => {
      const gameState = await GameState.query().findById(session.id);
      socket.emit("state", gameState.data);

      socket.on("move", async (message, callback) => {
        const { fromX, fromY, toX, toY, promotionFigure } = message;

        const gameStateRecord = await GameState.query().findById(session.id);
        const gameState = gameStateObjectToClass(gameStateRecord.data);
        const { grid, currentSideMove, allowedMoves } = gameState;

        // check if move is allowed
        if (
          !allowedMoves[`[${fromX}, ${fromY}]`].some(
            ([x, y]) => x === toX && y === toY
          )
        ) {
          console.error(
            `move from (${fromX}, ${fromY}) to (${toX}, ${toY}) not allowed`
          );
          return;
        }

        let figure = grid[fromX][fromY];

        const newGrid = grid.map((row) => row.slice());
        const oppositeSide =
          currentSideMove === Side.WHITE ? Side.BLACK : Side.WHITE;

        // check promotion
        if ((figure.name === "Pawn" && toX === 0) || toX === grid.length - 1) {
          console.log(promotionFigure);
          if (promotionFigure === "Queen") {
            figure = new Queen(currentSideMove);
          }
          if (promotionFigure === "Bishop") {
            figure = new Bishop(currentSideMove);
          }
          if (promotionFigure === "Knight") {
            figure = new Knight(currentSideMove);
          }
          if (promotionFigure === "Rook") {
            figure = new Rook(currentSideMove);
          }
        }

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

        let newGameState: any = {
          grid: newGrid,
          currentSideMove: oppositeSide,
          isCheck,
          isMate,
          history: [
            ...gameState.history,
            { from: [fromX, fromY], to: [toX, toY], figure: figure },
          ],
        };
        newGameState = {
          ...newGameState,
          allowedMoves: getAllowedMoves(
            newGameState,
            newGameState.currentSideMove
          ),
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
