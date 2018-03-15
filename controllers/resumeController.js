var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Company = require('../models/company');
var Bid = require('../models/bid');
var Block = require('../models/block');
var Resume = require('../models/resume');
var urlencoderParser = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb://localhost/biding');
mongoose.Promise = global.Promise;

module.exports = function(io){
  var table;
  //Find all the blocks and update the blocks information
  Block.find({}).then(function(blocks){
    blocks.forEach(function(block){
      //Find the bigger bids for each block
      Bid.find({block: block.name}).sort({amount: -1, time: 1}).limit(1).exec(function(err, maxBid){
        //Check if there was a bid for the current block
        if (maxBid[0]){
          //Update the actual price for the blocks

          Block.findOneAndUpdate({name: block.name}, {actualPrice: maxBid[0].amount, company: maxBid[0].company}, function(block){

          });
        }
      });
    });

  });

  //Generate the table with all the amounts
  setTimeout(function(){
    table = [];
    Company.find({}).sort({name: 1}).then(function(companies){
      companies.forEach(function(company){

        var newResume = new Resume();
        newResume.company=company.name;
        newResume.round = process.env.ROUND;
        Bid.find({company: company.name}, {amount: 1, _id: 0}).then(function(bids){
          newResume.amounts=bids;
          Resume(newResume).save();
          table.push(newResume);
        });
      });
    })
  }, 500);

  setTimeout(function(){
    process.env.TABLE = table;
    io.sockets.emit('control', {message: 'end-round', round: process.env.ROUND, table: table});
    console.log(process.env.TABLE);
  }, 1000);

}
