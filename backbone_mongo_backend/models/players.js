var mongoose = require('mongoose');


var playerSchema = mongoose.Schema({
  username: String
});



var Player = mongoose.model('player', playerSchema);

module.exports = Player;