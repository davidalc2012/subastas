const mongoose = require('mongoose');
const Block = require('../models/block');

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to data base before test runs
function connect(funct){
  mongoose.connect('mongodb://localhost/biding');
  mongoose.connection.once('open', function(){
    console.log('Connection has been made');
    if (funct) funct();
  }).on('error', function(err){
    console.log('Connection error: ', err);
  });
}


function deleteBlocks (funct){
  mongoose.connection.collections.blocks.drop(function(err){
    if (err) console.log('Deleting error: ', err);
    console.log('Elements deleted');
    if (funct) funct();
  });
};

function createBlocks(funct){
  console.log("entrada");
  var block;
  var blockNames =['A', 'B', 'C', 'D'];
  for(var i=0; i<4; i++){
    block=new Block({
      name: blockNames[i]
    });
    Block.create(block, function(err){
      if (err) console.log('Creating error');
    });
  }
  console.log('Elements created');
  if (funct) funct();
};

//connect(deleteBids(createBids()));
connect(createBlocks());
//createBlocks();
