//Make connection
var socket = io.connect('http://148.205.36.16:4000');

//Query DOM
var info = document.getElementById('info'),
    btn_start = document.getElementById('start'),
    btn_stop = document.getElementById('stop'),
    btn_add = document.getElementById('addBlock'),
    companies = document.getElementById('companies'),
    blocks = document.getElementById('blocks'),
    increment = document.getElementById('increment'),
    round = document.getElementById('round');

//Go to add blocks page
btn_add.addEventListener('click', function(){
  window.location.href = 'http://148.205.36.16:4000/blocks/new';
});

//Start the round
btn_start.addEventListener('click',function(){

  socket.emit('control',{
    message: 'start-round',
    increment: increment.value
  });
  info.innerHTML = "Ronda en curso";

});

//Stop the round
btn_stop.addEventListener('click',function(){

  socket.emit('control',{
    message: 'stop-round'
  });
  info.innerHTML = "Ronda detenida";

});

socket.on('control', function(data){
  if (data.message === 'end-round') {
    info.innerHTML = 'Fin de ronda';
    round.innerHTML = "Rondas finalizadas: " + data.round;

    //Load COMPANIES
    $.ajax({
      type: 'GET',
      url: '/companies',
      success: function(data){
        companies.innerHTML = '<thead><tr><th style="width:25px;" align="center">Compañia</th><th style="width:25px;" align="center">Dispensas</th><th style="width:25px;" align="center">Eligibilidad</th></tr></thead>';
        data.forEach(function(company){
          companies.innerHTML += "<tr><td>" + company.name + "</td><td>" + company.dispensation + "</td><td>" + company.eligibility + "</td></tr>";
        });
      }
    });

    //Load blocks
    $.ajax({
      type: 'GET',
      url: '/blocks',
      success: function(data){
        companies.innerHTML = '<thead><tr><th style="width:25px;" align="center">Bloque</th><th style="width:25px;" align="center">Precio inicial</th><th style="width:25px;" align="center">Precio actual</th><th style="width:25px;" align="center">Compañia</th></tr></thead>';
        data.forEach(function(block){
          blocks.innerHTML += "<tr><td>" + block.name + "</td><td>" + block.initialPrice + "</td><td>" + block.actualPrice + "</td><td>" + block.company + "</td></tr>";
        });
      }
    });
  }
});

socket.on('register', function(data){
  $.ajax({
    type: 'GET',
    url: '/companies',
    success: function(data){
      companies.innerHTML = '<thead><tr><th style="width:25px;" align="center">Compañia</th><th style="width:25px;" align="center">Dispensas</th><th style="width:25px;" align="center">Eligibilidad</th></tr></thead>';
      data.forEach(function(company){
        companies.innerHTML += "<tr><td>" + company.name + "</td><td>" + company.dispensation + "</td><td>" + company.eligibility + "</td></tr>";
      });
    }
  });
});

  //companies.innerHTML += "<tr><td>" + data.name + "</td><td>" + data.dispensation + "</td><td>" + data.eligibility + "</td></tr>";
