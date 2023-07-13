import Coords from "src/features/game/types/Coords";
import GameStateData from "src/features/game/types/GameStateData";
import PieceName from "../enums/PieceName";
import Side from "../enums/Side";
import MoveData from "../types/MoveData";
import createPiece from "../utils/createPiece";
import { calcIsCheck } from "./calcMoves";

export default function move(moveData: MoveData, gameState: GameStateData) {
  const { grid, allowedMoves, currentSideMove } = gameState;
  const {
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
    promotionPiece,
  } = moveData;

  const isAllowed = allowedMoves[`[${fromX}, ${fromY}]`].some(
    ({ x, y }) => x === toX && y === toY
  );

  if (!isAllowed) {
    console.error(
      `move from (${fromX}, ${fromY}) to (${toX}, ${toY}) not allowed`
    );
    return;
  }

  let piece = grid[fromX][fromY];

  // promotion
  if ((piece.name === PieceName.pawn && toX === 0) || toX === grid.length - 1) {
    piece = createPiece(promotionPiece, currentSideMove);
  }

  // passant
  if (piece.name === PieceName.pawn && fromY !== toY) {
    grid[fromX][toY] = null;
  }

  // castling
  if (piece.name === PieceName.king && Math.abs(fromY - toY) === 2) {
    const castlingDirection = toY - fromY > 0 ? 1 : -1;
    const [rookX, rookY] = [toX, castlingDirection > 0 ? grid.length - 1 : 0];
    const rook = grid[rookX][rookY];
    grid[rookX][fromY + castlingDirection] = rook;
    grid[rookX][rookY] = null;
  }

  grid[toX][toY] = piece;
  grid[fromX][fromY] = null;

  gameState.history.push({
    from: { x: fromX, y: fromY },
    to: { x: toX, y: toY },
    piece,
  });
  return updateGameState(gameState);
}

function updateGameState(gameState: GameStateData) {
  const { currentSideMove } = gameState;
  const oppositeSide = currentSideMove === Side.White ? Side.Black : Side.White;

  const isCheck = calcIsCheck(gameState, oppositeSide);
  const allowedMoves = getAllowedMoves(gameState, oppositeSide);
  const isMate = isCheck ? Object.keys(allowedMoves).length === 0 : false;

  return {
    ...gameState,
    isCheck,
    isMate,
    currentSideMove: oppositeSide,
    allowedMoves,
  };
}

export function getAllowedMoves(
  gameState: GameStateData,
  side: Side
): { [key: string]: Coords[] } {
  let result = {};
  for (let i = 0; i < gameState.grid.length; i++) {
    for (let j = 0; j < gameState.grid.length; j++) {
      const figure = gameState.grid[i][j];
      if (figure !== null && figure.side === side) {
        const figureAllowedMoves = figure.getAllowedMoves(gameState, {
          x: i,
          y: j,
        });
        if (figureAllowedMoves.length > 0) {
          result[`[${i}, ${j}]`] = figureAllowedMoves;
        }
      }
    }
  }
  return result;
}
