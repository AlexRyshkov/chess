import PieceStartLocation from "src/features/game/constants/pieceStartLocation";
import PieceName from "src/features/game/enums/PieceName";
import Coords from "src/features/game/types/Coords";
import {
  hasMovedPreviously,
  isEnemyFigure,
  isInGridRange,
} from "../moves/calcMoves";
import GameStateData from "../types/GameStateData";
import Piece from "./Piece";

export default class King extends Piece {
  name = PieceName.king;

  getMoves(gameState: GameStateData, coords: Coords): Coords[] {
    const { x, y } = coords;
    const result = [];

    // castling check
    if (!gameState.isCheck) {
      const kingMoved = hasMovedPreviously(
        gameState,
        PieceStartLocation[this.side][this.name] as Coords
      );
      const rookStartLocations = PieceStartLocation[this.side][
        PieceName.rook
      ] as Coords[];

      if (!kingMoved) {
        for (const { x: rookX, y: rookY } of rookStartLocations) {
          const castlingSign = rookY > y ? -1 : 1;
          if (!hasMovedPreviously(gameState, { x: rookX, y: rookY })) {
            let canDoCastling = true;
            for (let i = rookY + castlingSign; i < y; i = i + castlingSign) {
              if (gameState.grid[x][i] !== null) {
                canDoCastling = false;
                break;
              }
            }
            if (canDoCastling) {
              result.push({ x: x, y: y - 2 * castlingSign });
            }
          }
        }
      }
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
        if (
          (isInGridRange(gameState.grid, newX, newY) &&
            gameState.grid[newX][newY] === null) ||
          isEnemyFigure(gameState.grid, coords, { x: newX, y: newY })
        ) {
          result.push({x:newX, y:newY});
        }
      }
    }
    return result;
  }

  override getAllowedMoves(gameState: GameStateData, coords: Coords): Coords[] {
    const { x, y } = coords;
    const moves = super.getAllowedMoves(gameState, coords);
    const filteredByCastling = moves.filter(({ y: moveY }) => {
      // castling move
      if (Math.abs(moveY - y) === 2) {
        return moves.some(({ y }) => Math.abs(moveY - y) === 1);
      }
      return true;
    });

    return filteredByCastling;
  }
}
