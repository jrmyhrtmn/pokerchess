export default function isSelectable(playerPos, opponentPos, pieceSelected, square) {
  if (pieceSelected === -1)
    return false;
  let displacement = Math.abs(square - playerPos)
  switch (pieceSelected) {
    case 0: // pawn
      // forward or backward
      if (displacement === 6)
        return true;
      // attack diagonal
      if ((square === opponentPos) && ((displacement === 5) || (displacement === 7)))
        return true;
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
      if ((displacement % 5 === 0) || (displacement % 7 === 0))
        return true;
      break;
    case 3: // knight
      if ((displacement === 13) || (displacement === 11) || (displacement === 8) || (displacement === 4))
        return true;
      break;
    case 4: // king
      if ((displacement === 1) || (displacement === 5) || (displacement === 6) || (displacement === 7))
        return true;
      break;
    case 5: // queen
      if ((displacement % 5 === 0) || (displacement % 6 === 0) || (displacement % 7 === 0))
        return true;
      if (square >= left && square <= right)
        return true;
      break;
  }

  return false;
}
