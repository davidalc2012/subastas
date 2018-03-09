//Make connection
var socket = io.connect('http://148.205.36.16:4000');

//Query DOM
var info = document.getElementById('info'),
    btn_start = document.getElementById('start')

btn_start.addEventListener('click',function(){

  socket.emit('control',{
    message: 'start-round'
  });
  info.innerHTML = "Ronda en curso";
});

socket.on('control', function(data){
  if (data.message === 'end-round') {
    info.innerHTML = 'Fin de ronda';
  }
});
