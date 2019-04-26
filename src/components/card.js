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
  let pieceNames = ['pawn', 'rook', 'bishop', 'knight', 'king', 'queen'];
  let style = props.selected ? "selected" : "not-selected";
  return (
    <button className={"card " + style}
            onClick={props.onClick}>
            <img src={(props.piece === -1) ? cardBack : pieces[props.piece]}
                 alt={(props.piece === -1) ? 'discarded' : pieceNames[props.piece]}/>
    </button>
  );
}
