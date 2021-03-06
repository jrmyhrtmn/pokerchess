import React, { Component } from 'react';
import io from 'socket.io-client';

import Game from './components/game';
import Welcome from './components/welcome';
import './App.css';
import './components/components.css';

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

    this.state.client.on('game_over', (victory) => {
      this.setState({
        connectionStatus: (victory) ? 'victory' : 'defeat',
        gameId: null,
        playerNum: 0,
        gameState: null
      });
    });

    this.router = this.router.bind(this);
  }

  router() {
    if (this.state.connectionStatus === 'waiting') {
      return (
        <h1 className={'waiting'}>Searching for an opponent...</h1>
      );
    }
    if (this.state.connectionStatus === 'victory') {
      return (
        <div>
          <h1>Congratulations! You Win!</h1>
          <button className='nav-button' onClick={() => this.setState({connectionStatus: 'disconnected'})}>
            Return to Start
          </button>
        </div>
      );
    }
    if (this.state.connectionStatus === 'defeat') {
      return (
        <div>
          <h1>You Lose!</h1>
          <button className='nav-button' onClick={() => this.setState({connectionStatus: 'disconnected'})}>
            Return to Start
          </button>
        </div>
      );
    }

    if (this.state.connectionStatus === 'connected') {
      console.log(JSON.stringify(this.state.gameState));
      return (<Game id={this.state.gameId}
                    socket={this.state.client}
                    playerNum={this.state.playerNum}
                    gameState={this.state.gameState}
              />);
    }
    return (<Welcome socket={this.state.client}/>);
  }

  render() {
    return (
      <div className="App">
        {this.router()}
        <h4 className="footer">Inspired by <a href='https://j4nw.itch.io/pawnbarian'>Pawnbarian</a>. Icons by <a href='https://game-icons.net'>Skoll</a> and <a href='http://lorcblog.blogspot.com'>Lorc</a> by <a href='https://creativecommons.org/licenses/by/3.0/'>CC BY 3.0</a></h4>
      </div>
    );
  }
}
