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
      gameState: this.props.gameState,
      selectedCard: -1
    }

    this.handleCardSelect = this.handleCardSelect.bind(this);
  }

  handleCardSelect(choice) {
    this.setState({selectedCard: choice});
  }

  render() {
    let playerPos = (this.state.playerNum === 1) ? this.state.gameState.p1_pos : this.state.gameState.p2_pos;
    let opponentPos = (this.state.playerNum === 1) ? this.state.gameState.p2_pos : this.state.gameState.p1_pos;
    let hand = (this.state.playerNum === 1) ? this.state.gameState.p1_hand : this.state.gameState.p2_hand;
    return (
      <div className="game">
        <div className="game-board">
          <Board playerPos={playerPos}
                 opponentPos={opponentPos}
                 selectedCard={this.state.selectedCard}
          />
        </div>
        <div className="hand">
          <Hand onClick={this.handleCardSelect} cards={hand} />
        </div>
      </div>
    );
  }
}
