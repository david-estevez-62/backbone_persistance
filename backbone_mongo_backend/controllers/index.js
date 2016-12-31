var Player = require('../models/players');

exports.index = function(req, res) {
  Player.find(function(err, docs) {
    res.render('index.html', {
      inds: docs
    });
  })
  
}