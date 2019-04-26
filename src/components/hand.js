import React from 'react';

import './components.css';
import Card from './card.js';

export default class Hand extends React.Component {
  renderCard(i) {
    return (
      <Card  piece = {this.props.cards[i]}
             onClick = {() => this.props.onClick(i)}
             selected = {this.props.selectedCard === i}
      />
    );
  }

  render() {
    const hand = [];
    for (let i = 0; i < 5; i++) {
      hand.push(this.renderCard(i));
    }

    return (<div>{hand}</div>);
  }
}
