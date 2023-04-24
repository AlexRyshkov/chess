import {Pawn} from "src/features/game/figures/Pawn";
import {Rook} from "src/features/game/figures/Rook";
import {Knight} from "src/features/game/figures/Knight";
import {Bishop} from "src/features/game/figures/Bishop";
import {Queen} from "src/features/game/figures/Queen";
import {King} from "src/features/game/figures/King";


export default function(gameState:any) {
    const {grid} = gameState;
    const newGrid = Array(8);
    for (let i = 0; i < grid.length; i++) {
        newGrid[i] = Array(8).fill(null);
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if ((grid[i][j]) !== null) {
                if (grid[i][j]?.name === 'Pawn')
                    newGrid[i][j] = new Pawn(grid[i][j].side)
                if (grid[i][j]?.name === 'Rook')
                    newGrid[i][j] = new Rook(grid[i][j]!.side)
                if (grid[i][j]?.name === 'Knight')
                    newGrid[i][j] = new Knight(grid[i][j]!.side)
                if (grid[i][j]?.name === 'Bishop')
                    newGrid[i][j] = new Bishop(grid[i][j]!.side)
                if (grid[i][j]?.name === 'Queen')
                    newGrid[i][j] = new Queen(grid[i][j]!.side)
                if (grid[i][j]?.name === 'King')
                    newGrid[i][j] = new King(grid[i][j]!.side)
            }
        }
    }

    return {...gameState, grid: newGrid};
}