//Make connection
var socket = io.connect('http://148.205.36.16:4000');

//Query DOM
var info = document.getElementById('info');

var roundsDIV = document.getElementById("rounds"),
  blocksNames = [];

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
    window.location.href = 'http://148.205.36.16:4000/resume';
  }
});


//Request for the blocks WINNERS TABLE
$.ajax({
  type: 'GET',
  url: '/blocks',
  success: function(blocks){
    var blocksDIV = document.createElement("div"),
      blocksTable = document.createElement("table"),
      tbodyElement = document.createElement("tbody");

    roundsDIV.innerHTML = "<h2>Postura válida más alta</h2>"
    blocksTable.innerHTML += '<thead><tr><th>Bloque</th><th>Compañia</th><th>PVMA</th></tr></thead>';

    for (var i = 0; i<blocks.length;i++){
      blocksNames[i] = blocks[i].name;
      var row = document.createElement("tr");
      var company = "";
      row.innerHTML = '<td>'+blocks[i].name+'</td><td>'+blocks[i].company+'</td><td>'+blocks[i].actualPrice+'</td>'
      tbodyElement.appendChild(row);
    }
    blocksDIV.style ="width:500px";
    blocksTable.classList.add("table");
    blocksTable.classList.add("table-striped");
    blocksTable.appendChild(tbodyElement);
    blocksDIV.appendChild(blocksTable);
    roundsDIV.appendChild(blocksDIV);
  }
});
