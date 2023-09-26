export const checkForWin = (
  numRows: number,
  numCols: number,
  playerTurn: string,
  board: string[][],
  row: number,
  col: number
): boolean => {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1], // Vertical, Horizontal, Diagonal (both directions)
  ];

  for (const [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        board[newRow][newCol] === playerTurn
      ) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 4; i++) {
      const newRow = row - i * dx;
      const newCol = col - i * dy;
      if (
        newRow >= 0 &&
        newRow < numRows &&
        newCol >= 0 &&
        newCol < numCols &&
        board[newRow][newCol] === playerTurn
      ) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 4) {
      return true;
    }
  }

  return false;
};
