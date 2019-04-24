import React from 'react';
import './components.css';
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
    return (
      <div className="game">
        <div className="game-board">
          <Board p1pos={this.state.gameState.p1_pos}
                 p2pos={this.state.gameState.p2_pos}
          />
        </div>
        <div className="hand">
          <Hand />
        </div>
      </div>
    );
  }
}
