var blockName = document.getElementById('blockName'),
    initialPrice = document.getElementById('initialPrice'),
    btn_register = document.getElementById('btn_register'),
    btn_return = document.getElementById('btn_return'),
    info = document.getElementById('info');

//Send the block for register
btn_register.addEventListener('click',function(){
  if (blockName.value === ""){
    info.innerHTML = "Introduce el nombre del bloque";
  } else {
    if (initialPrice.value === ""){
      initialPrice.value = 100;
    }
    $.ajax({
      type: 'POST',
      url: '/blocks/new',
      data: {name: blockName.value, initialPrice: initialPrice.value, actualPrice: initialPrice.value},
      success: function(data){
        info.innerHTML = "Bloque registrado";
        initialPrice.value = "";
        blockName.value = "";
      }
    });
  }
});

//Return to control
btn_return.addEventListener('click',function(){
  window.location.href = 'http://148.205.36.16:4000/control/';
});
