//Make connection
var socket = io.connect('http://148.205.36.162:4000');

//Query DOM
var info = document.getElementById('info');

socket.on('control', function(data){
  blocks.forEach(function(block){
    if (block.company === sessionStorage.getItem('company')){
      doBid = 1;
    }
  });
  if (data.message === "end-round"){
    if (phase === 2 && counter < eligibility){
      doBid = 0;
    }
    if (doBid === 0) {
      $.ajax({
        type: 'POST',
        url: '/eligibility',
        data: {company: sessionStorage.getItem('company')},
        success: function(data){
        }
      });
    }
    window.location.href = 'http://148.205.36.162:4000/resume';
  }
});
