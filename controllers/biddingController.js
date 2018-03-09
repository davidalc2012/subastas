var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Company = require('../models/company');
var Bid = require('../models/bid');
var Block = require('../models/block');
var urlencoderParser = bodyParser.urlencoded({extended: false});


//TODO change the IP
mongoose.connect('mongodb://localhost/biding');

module.exports = function(app){

  //Send the data for the actual round, blocks and prices, dispensation and Eligibility
  //{[block, actualPrice], dispensation, eligibility}
  app.get('/bidding/:name', function(req, res){
    //Search for all the blocks
    Block.find({}).then(function(blocks){
      var blocksRes = [];
      blocks.forEach(function(block){
        blocksRes.push({name: block.name, actualPrice: block.actualPrice});
      });
      Company.findOne({name: req.params.name}).then(function(company){
        console.log(company.dispensation);
        res.render('bidding', {blocks: blocksRes, dispensation: company.dispensation, eligibility: company.eligibility});
      });
    });
  });

  //Send all the information of all the rounds
  //
  app.get('/resume', function(req, res){
    //TODO assamble the resume
    res.render('resume');
  });

  //Send control page
  app.get('/control', function(req, res){
    res.render('control');
  });
}
