import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      client: io.connect('http://localhost:3001'),
      connectionStatus: 'disconnected',
      gameId: null,
      playerNum: 0,
      gameState: null
    }

    this.state.client.on('waiting', () => {
      this.setState({connectionStatus: 'waiting'});
    });

    this.state.client.on('game_start', (gameInfo) => {
      this.setState({
        connectionStatus: 'connected',
        gameId: gameInfo.game_id,
        playerNum: gameInfo.player_num,
        gameState: gameInfo.game_state
      });
    });

    this.joinGame = this.joinGame.bind(this);
  }

  joinGame() {
    this.state.client.emit('new_game');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
