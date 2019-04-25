export default function isSelectable(playerPos, opponentPos, pieceSelected, square) {
  if (pieceSelected === -1)
    return false;

  if (square === playerPos)
    return false;

  let displacement = Math.abs(square - playerPos)
  let squareCol = square % 6;
  let squareRow = Math.floor(square / 6);
  let playerCol = playerPos % 6;
  let playerRow = Math.floor(playerPos / 6);

  switch (pieceSelected) {
    case 0: // pawn
      // forward or backward
      if (displacement === 6)
        return true;
      // attack diagonal
      if (square === opponentPos) {
        if ((displacement === 5) && ((playerCol - squareCol) * (playerRow - squareRow) < 0))
          return true;
        if ((displacement === 7) && ((playerCol - squareCol) * (playerRow - squareRow) > 0))
          return true;
      }
      break;
    case 1: // rook
      // vertical
      if (displacement % 6 === 0)
        return true;
      // horizontal
      let left = playerPos - (playerPos % 6);
      let right = playerPos + (5 - (playerPos % 6));
      if (square >= left && square <= right)
        return true;
      break;
    case 2: // bishop
      if ((displacement % 5 === 0) && ((playerCol - squareCol) * (playerRow - squareRow) < 0))
        return true;
      if ((displacement % 7 === 0) && ((playerCol - squareCol) * (playerRow - squareRow) > 0))
        return true;
      break;
    case 3: // knight
      if (((displacement === 11) || (displacement === 4)) && ((playerCol - squareCol) * (playerRow - squareRow) < 0))
        return true;
      if (((displacement === 13) || (displacement === 8)) && ((playerCol - squareCol) * (playerRow - squareRow) > 0))
        return true;
      break;
    case 4: // king
      if ((displacement === 1) && (playerRow === squareRow))
        return true;
      if ((displacement === 5) && ((playerCol - squareCol) * (playerRow - squareRow) < 0))
        return true;
      if ((displacement === 7) && ((playerCol - squareCol) * (playerRow - squareRow) > 0))
        return true;
      if (displacement === 6)
        return true;
      break;
    case 5: // queen
      if (displacement % 6 === 0)
        return true;
      let queenLeft = playerPos - (playerPos % 6);
      let queenRight = playerPos + (5 - (playerPos % 6));
      if (square >= queenLeft && square <= queenRight)
        return true;
      if ((displacement % 5 === 0) && ((playerCol - squareCol) * (playerRow - squareRow) < 0))
        return true;
      if ((displacement % 7 === 0) && ((playerCol - squareCol) * (playerRow - squareRow) > 0))
        return true;
      break;
  }

  return false;
}
