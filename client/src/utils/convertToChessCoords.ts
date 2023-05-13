export default function convertToChessCoords(x: number, y: number): string {
  console.log(x, y);
  return `${gridColumnNames[y]}${x + 1}`;
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
