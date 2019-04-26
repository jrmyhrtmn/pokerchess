import React from 'react';
import './components.css';
import player from '../icons/player.svg';
import opponent from '../icons/opponent.svg';

export default function Square(props) {
  let icon = (props.player === 1) ? player : opponent;
  return (
    <button className={"square " + props.color} onClick={props.onClick}>
      {props.player ? <img src={icon} alt={(player === 1) ? 'player' : 'opponent'}/> : null}
    </button>
  );
}
