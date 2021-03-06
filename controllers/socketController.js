var socket = require('socket.io');
var resumeController = require('./resumeController');
//WebSocket configuration
module.exports = function(server){
  var timer;
  var io = socket(server);
  io.on('connection', function(socket){
    console.log('Connection made: ', socket.id);

    //Get a control message to start the timer and round
    socket.on('control', function(data){
      if (data.message === 'start-round'){
        process.env.INCREMENT=data.increment/100;
        socket.broadcast.emit('control', {message: 'start-round'});
        timer = setTimeout(function(){
          process.env.ROUND++;
          resumeController(io);
        }, 300000); //TODO cambiar tiempo
      } else if (data.message === "stop-round"){
        clearTimeout(timer);
        process.env.ROUND++;
        resumeController(io);
      }
    });

    socket.on('register', function(data){
      io.sockets.emit('register',data);
    });

  });

};
