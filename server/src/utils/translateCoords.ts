export function translateCoord(coord: number, gridSize = 8) {
  return gridSize - coord - 1;
}
