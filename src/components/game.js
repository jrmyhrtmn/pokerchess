import React from 'react';
import '../index.css';
import Board from './board.js';
import Hand from './hand.js';


export default class Game extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      socket: this.props.socket,
      id: this.props.id,
      playerNum: this.props.playerNum,
      gameState: this.props.gameState
    }

  }

  render() {
    return (<h2>WIP</h2>);
  }
}
