var express = require('express');
var bindingController = require('./controllers/bindingController');
var socketController = require('./controllers/socketController');

var app = express();

//set up teplate engine
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Set controller
bindingController(app);
socketController(app);

//Listen to port
app.listen(3000);
console.log('You are listening to port 3000');
