var express = require('express');
var biddingController = require('./controllers/biddingController');
var socketController = require('./controllers/socketController');

var app = express();

//set up teplate engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('./public'));

//Set round number to 0
process.env.ROUND = 0;
process.env.COMPANIES = 0;
process.env.INCREMENT = 0.20;
process.env.PHASE = 1;
//Set controller
biddingController(app);

//Listen to port
var server = app.listen(4000, function(){
  console.log('Listen to port 4000')
});

socketController(server);
