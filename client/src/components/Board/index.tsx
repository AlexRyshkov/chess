import Grid from 'shared/types/Grid';
import { flipCoords } from 'shared/utils/flipCoords';
import Cell from './Cell';

const Board = ({
  grid,
  highlightedCells,
  flipped,
}: {
  grid: Grid;
  flipped?: boolean;
  highlightedCells?: [number, number][];
}) => {
  return (
    <div className='grid'>
      {Array.isArray(grid) &&
        grid.map((row, i: number) =>
          row.map((cell, j: number) => {
            const [x, y] = [flipped ? flipCoords(i) : i, flipped ? flipCoords(j) : j];

            return (
              <Cell
                grid={grid}
                key={`${x}${y}`}
                x={x}
                y={y}
                isHighlighted={Boolean(highlightedCells?.some(([x1, y1]) => x1 === x && y1 === y))}
              />
            );
          }),
        )}
    </div>
  );
};

export default Board;
