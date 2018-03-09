var socket = require('socket.io');

//WebSocket configuration
module.exports = function(server){
  var io = socket(server);
  io.on('connection', function(socket){
    console.log('Connection made: ', socket.id);


    //Get a control message to start the timer and round
    socket.on('control', function(data){
      console.log(data.message);
      if (data.message === 'start-round'){
        setTimeout(function(){
          io.sockets.emit('control', {message: 'end-round'});
          console.log('end-round')
        }, 3000);
      }
    });

  });

};
