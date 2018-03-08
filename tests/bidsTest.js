const mongoose = require('mongoose');
const Bid = require('../models/bid');

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


function deleteBids (funct){
  mongoose.connection.collections.bids.drop(function(err){
    if (err) console.log('Deleting error: ', err);
    console.log('Elements deleted');
    if (funct) funct();
  });
};

function createBids(funct){
  var bid;
  for(var i=0; i<10; i++){
    bid=new Bid({
      company: i.toString(),
      block: "A",
      amount: Math.floor(Math.random() * 11),
      //amount: 3,
      time: new Date().getTime()
    });
    Bid.create(bid, function(err){
      if (err) console.log('Creating error');
    });
  }
  console.log('Elements created');
  if (funct) funct();
};

//connect(deleteBids(createBids()));
connect();
Bid.find({}).sort({amount: -1, time: -1}).exec(function(err, bids){
    console.log(bids);
});
// Company.find({}).then(function(companies){
//     console.log(companies);
// });

// Company.find({}).sort({eligibility: -1}).limit(3).exec(function(err, company){
//   console.log(company[0].name);
// });
