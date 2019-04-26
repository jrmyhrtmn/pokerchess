import React from 'react';
import './components.css';

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to PokerChess!</h1>
        <p className='welcome-text'>PokerChess is a game which combines components of chess and poker. Each player moves a single gamepiece around the board with movement rules corresponding to the chess pieces on the cards in their hand. Each turn, the player chooses a card from their hand to determine their movement rules and then selects one of the highlighted spaces to move their gamepiece to. Every four turns, each player is dealt a new hand of five cards. The game is over when one player moves their piece on top of the opponent's.</p>
        <button className='nav-button' onClick={() => {this.props.socket.emit('new_game')}}>Find Game</button>
      </div>
    );
  }
}
