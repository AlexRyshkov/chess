import Coords from '../types/Coords';

export default function convertToChessCoords(coords: Coords): string {
  return `${gridColumnNames[coords.y]}${coords.x + 1}`;
}

const gridColumnNames: { [key: number]: string } = {
  0: 'h',
  1: 'g',
  2: 'f',
  3: 'e',
  4: 'd',
  5: 'c',
  6: 'b',
  7: 'a',
};
