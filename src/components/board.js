import React from 'react';

import './components.css';
import Square from './square.js';
import isSelectable from './logic.js';

export default class Board extends React.Component {
  renderSquare(i, color) {
    let shade = color;
    let player = 0;
    if (this.props.playerPos === i) {
      player = 1;
    } else if (this.props.opponentPos === i) {
      player = 2;
    }

    let onClick = null;
    let selectable = isSelectable(this.props.playerPos, this.props.opponentPos, this.props.selectedCard, i);

    if (selectable) {
      shade = "selectable";
      onClick = this.props.onClick;
    }

    return (
      <Square player  = {player}
              color   = {shade}
              onClick = {onClick}
      />
    );
  }
        
  render() {
    const board = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        const clr = (i % 2 && j % 2) || (!(i % 2) && !(j % 2))? "w-sq" : "b-sq";
        row.push(this.renderSquare((i * 6) + j, clr));
      }
      board.push(<div className="board-row">{row}</div>);
    }

    return (<div>{board}</div>);
  }
}
