import styled from '@emotion/styled';
import Grid from 'types/Grid';
import { flipCoord } from 'utils/flipCoord';
import Cell from './Cell';

const BoardContainer = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(8, minmax(0, 1fr));
`;

interface Props {
  grid: Grid;
  flipped?: boolean;
  highlightedCells?: [number, number][];
}

const Board = ({ grid, highlightedCells, flipped }: Props) => {
  const cells = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const [x, y] = [flipped ? flipCoord(i) : i, flipped ? flipCoord(j) : j];

      cells.push(
        <Cell
          figure={grid[x][y]}
          key={`${x}${y}`}
          x={x}
          y={y}
          isHighlighted={Boolean(highlightedCells?.some(([x1, y1]) => x1 === x && y1 === y))}
        />,
      );
    }
  }

  return <BoardContainer>{cells}</BoardContainer>;
};

export default Board;
