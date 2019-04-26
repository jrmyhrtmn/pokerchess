import React from 'react';
import './components.css';
import pawn from '../icons/pawn.svg';
import rook from '../icons/rook.svg';
import bishop from '../icons/bishop.svg';
import knight from '../icons/knight.svg';
import king from '../icons/king.svg';
import queen from '../icons/queen.svg';
import cardBack from '../icons/card-back.svg';

export default function Card(props) {
  let pieces = [pawn, rook, bishop, knight, king, queen];
  return (
    <button className={"card"}
            onClick={props.onClick}>
            <img src={(props.piece == -1) ? cardBack : pieces[props.piece]} />
    </button>
  );
}
