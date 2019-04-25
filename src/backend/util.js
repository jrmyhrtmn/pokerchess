function shuffle() {
  const deck = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5]
  const p1_hand = [];
  const p2_hand = [];

  for (let i = 0; i < 5; i++) {
    let card1 = Math.random() * (12 - 2 * i);
    p1_hand.push(deck[card1]);
    delete deck[card1];

    let card2 = Math.random() * (11 - 2 * i);
    p2_hand.push(deck[card2]);
    delete deck[card2];
  }

  return {p1_hand: p1_hand, p2_hand: p2_hand};
}

function initialiseGame(p1, p2) {
  const hands = shuffle();
  console.log(JSON.stringify(hands));
  hand1 = hands.p1_hand;
  hand2 = hands.p2_hand;

  return {
    p1_id: p1,
    p2_id: p2,
    p1_pos: 2,
    p2_pos: 33,
    p1_hand: hand1,
    p2_hand: hand2,
    turn_count: 0
  }
}

exports.shuffle = function() {
  return shuffle();
}

exports.initialiseGame = function(p1, p2) {
  return initialiseGame(p1, p2);
}
