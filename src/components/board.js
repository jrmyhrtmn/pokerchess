import React from 'react';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {
  renderSquare(i, color) {
    var player = 0;
    if (this.props.p1pos == i) {
      player = 1;
    } else if (this.props.p2pos == i) {
      player = 2;
    }

    return (
      <Square player = {player}
              color  = {color}
              onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 6; j++) {
        const clr = (i % 2 && j % 2) || (!(i % 2) && !(j % 2))? "w-sq" : "b-sq";
        row.push(this.renderSquare((i * 8) + j, clr));
      }
      board.push(<div className="board-row">{row}</div>);
    }

    return (<div>{board}</div>);
  }
}
