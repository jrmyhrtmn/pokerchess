function shuffle() {
  let deck = [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5]
  const p1_hand = [];
  const p2_hand = [];

  for (let i = 0; i < 5; i++) {
    let idx1 = Math.floor(Math.random() * (13 - 2 * i));
    let card1 = deck[idx1];
    p1_hand.push(card1);
    deck.splice(idx1, 1);

    let idx2 = Math.floor(Math.random() * (12 - 2 * i));
    let card2 = deck[idx2];
    p2_hand.push(card2);
    deck.splice(idx2, 1);
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
