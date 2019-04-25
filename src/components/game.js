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
      selectedCard: -1,
      cardIndex: null
    }

    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.handleMoveSelect = this.handleMoveSelect.bind(this);

    this.state.socket.on("game_update", (gameState) => {
      this.setState({gameState: gameState, selectedCard: -1, cardIndex: null});
    });
  }

  handleMoveSelect(choice) {
    let gameState = this.state.gameState;
    let player = (this.state.playerNum === 1) ? 'p1_pos' : 'p2_pos';
    let hand = (this.state.playerNum === 1) ? 'p1_hand' : 'p2_hand';
    let opponent = (this.state.playerNum === 1) ? this.state.gameState.p2_id : this.state.gameState.p1_id;
    gameState[player] = choice;
    gameState[hand][this.state.cardIndex] = -1;
    gameState.turn_count = gameState.turn_count + 1;
    let data = {id: this.state.id, gameState: gameState, opponent: opponent};
    this.state.socket.emit("end_turn", data);
  }

  handleCardSelect(choice) {
    let hand = (this.state.playerNum === 1) ? this.state.gameState.p1_hand : this.state.gameState.p2_hand;
    this.setState({selectedCard: hand[choice], cardIndex: choice});
  }

  render() {
    let playerPos = (this.state.playerNum === 1) ? this.state.gameState.p1_pos : this.state.gameState.p2_pos;
    let opponentPos = (this.state.playerNum === 1) ? this.state.gameState.p2_pos : this.state.gameState.p1_pos;
    let hand = (this.state.playerNum === 1) ? this.state.gameState.p1_hand : this.state.gameState.p2_hand;
    let active = (((this.state.playerNum + this.state.gameState.turn_count) % 2) ? true : false);
    return (
      <div className="game">
        <div className="game-board">
          <Board playerPos={playerPos}
                 opponentPos={opponentPos}
                 selectedCard={this.state.selectedCard}
                 active={active}
                 onMoveSelect={this.handleMoveSelect}
          />
        </div>
        <div className="hand">
          <Hand onClick={this.handleCardSelect} cards={hand} />
        </div>
      </div>
    );
  }
}
