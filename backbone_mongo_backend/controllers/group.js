var Player = require('../models/players');


exports.addplayer = function(req, res) {
  var thisPlayer = new Player(req.body);
  
  thisPlayer.save(function(err, doc){
    res.send('Successful save');
  });
  
}


exports.getplayers = function(req, res) {
  Player.find(function(err, players) {
    res.send(players);
  })
}