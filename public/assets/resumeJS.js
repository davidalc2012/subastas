//Make connection
var socket = io.connect('http://148.205.36.16:4000');

var roundsDIV = document.getElementById("rounds"),
  blocksNames = [];

function setResumes(){
  $.ajax({
    type: 'GET',
    url: '/resumeData',
    success: function(data){
      //console.log(data.resumes);
      var stringHeader = "";
      for (var i = 0; i<blocksNames.length;i++){
        stringHeader += "<th>"+blocksNames[i]+"</th>";
      }
      stringHeader = "<thead><tr><th>Compañias\\Bloques</th>" + stringHeader + "</tr></thead>"


      for (var i = 0; i<=data.round; i++){
        var divRound = document.createElement("div"),
          tableRound = document.createElement("table"),
          tbodyRound = document.createElement("tbody");

        tableRound.innerHTML = stringHeader;
        divRound.innerHTML = '<h3>Ronda ' + (i+1) + '</h3>';

        for (var j=0; j<data.companies;j++){
          var amountsInfo = data.resumes.shift();
          //console.log(amountsInfo);
          var row = document.createElement("tr");
          row.innerHTML = "<td>" + amountsInfo.company + "</td>";
          var count = 0;
          for(var k = 0; k<blocksNames.length; k++){
            if(!amountsInfo.amounts[count]){
              k=blocksNames.length;
            } else if(amountsInfo.amounts[count].block === blocksNames[k]){
              row.innerHTML += "<td>" + amountsInfo.amounts[count].amount + "</td>";
              count++;
            } else {
              row.innerHTML += "<td>-</td>";
            }
          }
          tbodyRound.appendChild(row);
        }


        divRound.style ="width:500px";
        tableRound.classList.add("table");
        tableRound.classList.add("table-striped");
        tableRound.appendChild(tbodyRound);
        divRound.appendChild(tableRound);
        roundsDIV.appendChild(divRound);
      }
    }
  });
}


//Request for the blocks WINNERS TABLE
$.ajax({
  type: 'GET',
  url: '/blocks',
  success: function(blocks){
    var blocksDIV = document.createElement("div"),
      blocksTable = document.createElement("table"),
      tbodyElement = document.createElement("tbody");
    blocksTable.innerHTML += '<thead><tr><th>Bloque</th><th>Compañia</th><th>Precio</th></tr></thead>';

    for (var i = 0; i<blocks.length;i++){
      blocksNames[i] = blocks[i].name;
      var row = document.createElement("tr");
      row.innerHTML = '<td>'+blocks[i].name+'</td><td>'+blocks[i].company+'</td><td>'+blocks[i].actualPrice+'</td>'
      tbodyElement.appendChild(row);
    }
    blocksDIV.style ="width:500px";
    blocksTable.classList.add("table");
    blocksTable.classList.add("table-striped");
    blocksTable.appendChild(tbodyElement);
    blocksDIV.appendChild(blocksTable);
    roundsDIV.appendChild(blocksDIV);
    setResumes();
  }
});

socket.on('control', function(data){
  if (data.message === "start-round"){
    window.location.href = 'http://148.205.36.16:4000/bidding/'+ sessionStorage.getItem('company');
  }
});
