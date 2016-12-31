var express = require('express');
var mongoose = require('mongoose');
var swig = require('swig');
var bodyParser = require('body-parser');

var indexController = require('./controllers/index.js');
var groupController = require('./controllers/group.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/backboneprac');


var app = express();

var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));

// *** static directory *** //
app.set('views', __dirname + '/views');

app.use(bodyParser.json());





app.get('/', indexController.index);
app.get('/players', groupController.getplayers);
app.post('/players', groupController.addplayer);




var server = app.listen(5350, function() {
	console.log('Express server listening on port ' + server.address().port);
});
