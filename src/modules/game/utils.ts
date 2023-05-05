export function areBoardDimensionsValid(
  boardWidth: number,
  boardHeight: number
) {
  return (boardWidth * boardHeight) % 2 === 0;
}
