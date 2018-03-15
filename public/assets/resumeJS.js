//Make connection
var socket = io.connect('http://148.205.36.16:4000');

var table = document.getElementById("table");

$.ajax({
  type: 'GET',
  url: '/resumeData',
  success: function(data){
    //TODO block the buttons and send message for waiting to the end of round
    data.forEach(function(amounts){
      //console.log(amounts);
      //table.innerHTML = "<h3>"
    });
  }
});
$.ajax({
  type: 'GET',
  url: '/blocks',
  success: function(data){
    //TODO block the buttons and send message for waiting to the end of round
    console.log(data);
    }
  });
