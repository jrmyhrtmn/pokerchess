const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema() {
  game_id: ObjectId,
  p1_id: String,
  p2_id: String,
  p1_pos: Number,
  p2_pos: Number,
  p1_hand: [Number],
  p2_hand: [Number],
  turn_count: Number
}

module.exports = mongoose.model('Game', Game);
