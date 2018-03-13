var express = require('express');
var biddingController = require('./controllers/biddingController');
var socketController = require('./controllers/socketController');

var app = express();

//set up teplate engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('./public'));

//Set controller
biddingController(app);

//Listen to port
var server = app.listen(4000, function(){
  console.log('Listen to port 4000')
});

socketController(server);
