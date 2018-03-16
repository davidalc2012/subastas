//Make connection
var socket = io.connect('http://148.205.36.16:4000');

//Query DOM
var info = document.getElementById('info');

socket.on('control', function(data){
  if (data.message === "end-round"){
    if (doBid === 0) {
      $.ajax({
        type: 'POST',
        url: '/eligibility',
        data: {company: sessionStorage.getItem('company')},
        success: function(data){
          console.log("ELIGIBILITY")
        }
      });
    }
    window.location.href = 'http://148.205.36.16:4000/resume';
  }
});
