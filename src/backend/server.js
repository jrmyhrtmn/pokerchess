const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let Game = require('./game.model');

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB connected.");
});

var queue = [];

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("new_game", () => {
    if (queue.length() == 0) {
      queue.push(socket.id);
    } else {
      const opponent = queue.pop();
      let game = initialiseGame(opponent, socket.id);
      game.save();

      io.to(opponent).emit("game_start", {
        game_id: game._id,
        game_state: game.toObject(),
        player_num: 1
      });
      socket.emit("game_start", {
        game_id: game._id,
        game_state: game.toObject(),
        player_num: 2
      });
    }
  });

  socket.on("end_turn", (data) => {
    Game.findByIdAndUpdate(data.id, data.gameState);
    if (data.gameState.turnCount == 8) {
      Game.findByIdAndUpdate(data.id, shuffle());
    }
    io.to(data.opponent).emit("start_turn", Game.findById(data.id, (err, game) => {
      return game.toObject();
    }));
  });

  socket.on("victory", (data) => {
    Game.findByIdAndDelete(data.id);
    io.to(data.opponent).emit("game_over", {victory: false});
    socket.emit("game_over", {victory: true});
    io.to(data.opponent).disconnect();
    socket.disconnect();
  });
});


// TODO shuffle function
// TODO add turn count to schema