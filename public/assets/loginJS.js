//Make connection
var socket = io.connect('http://148.205.36.16:4000');

//Query DOM
var companyName = document.getElementById('companyName'),
    btn_register = document.getElementById('btn_register'),
    info = document.getElementById('info');

socket.on('control', function(data){
  if (data.message === 'start-round'){
    window.location.href = 'http://148.205.36.16:4000/bidding/' + sessionStorage.getItem('company');
  }
});

//Send the company for register
var sendCompany = function(){
  if (companyName.value === ""){
    info.innerHTML = "Introduce el nombre de la empresa";
  } else {
    sessionStorage.setItem('company', companyName.value);
    $.ajax({
      type: 'POST',
      url: '/login/',
      data: {name: companyName.value},
      success: function(data){
        //TODO block the buttons and send message for waiting to the end of round
        info.innerHTML = "Registro efectuado correctamente. Espera a que comiencen las  rondas";
        socket.emit('register',{
          name: data.name,
          eligibility: data.eligibility,
          dispensation: data.dispensation
        });
        btn_register.removeEventListener('click', sendCompany);
      }
    });
  }
};

btn_register.addEventListener('click', sendCompany);
