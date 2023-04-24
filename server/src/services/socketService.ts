import {Namespace, Server} from "socket.io";
import Session from "src/models/Session";
import GameState from "src/models/GameState";
import {calcIsCheck, calcIsMate} from "src/features/game/figures/calcMoves";
import {King} from "src/features/game/figures/King";
import {Side} from "src/features/game/enums/Side";
import jsonGameStateToClass from "src/jsonGameStateToClass";

export default class SocketService {
    private ioInstance: Server;

    constructor(server: any) {
        this.ioInstance = new Server(server, {
            cors: {
                origin: '*',
            },
        });
    }

    createGameSessionSocket(session: Session): Namespace {
        const gameNamespace = this.ioInstance.of(session.id);

        gameNamespace.on("connection", async (socket) => {
            const gameState = await GameState.query().findById(session.id);
            socket.emit('state', gameState.data);

            socket.on('move', async (message, callback) => {
                const {fromX, fromY, toX, toY } = message;
                const gameStateRecord = await GameState.query().findById(session.id);
                const gameState = jsonGameStateToClass(gameStateRecord.data);
                const {grid, currentSideMove} = gameState;
                const figure = grid[fromX][fromY];

                const newGrid = grid.map((row) => row.slice());
                const oppositeSide = currentSideMove === Side.WHITE ? Side.BLACK : Side.WHITE;
                newGrid[toX][toY] = figure;
                newGrid[fromX][fromY] = null;

                if (figure instanceof King && Math.abs(toY - fromY) === 2) {
                    newGrid[fromX][fromY - 1] = newGrid[0][0];
                    newGrid[0][0] = null;
                }

                const isCheck = calcIsCheck({ ...gameState, grid: newGrid }, oppositeSide);
                const isMate = isCheck ? calcIsMate({ ...gameState, grid: newGrid }, oppositeSide) : false;

                const newGameState = {
                    grid: newGrid,
                    currentSideMove: oppositeSide,
                    isCheck,
                    isMate,
                    history: [...gameState.history, { from: [fromX, fromY], to: [toX, toY], figure: figure }],
                }

                await GameState.query().patch({data:newGameState}).findById(session.id)
                socket.broadcast.emit('state', newGameState)
                callback(newGameState);
            });
        });
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