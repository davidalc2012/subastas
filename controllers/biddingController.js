//Hola
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Company = require('../models/company');
var Bid = require('../models/bid');
var Block = require('../models/block');
var Resume = require('../models/resume');
var urlencoderParser = bodyParser.urlencoded({extended: false});


//TODO change the IP
mongoose.connect('mongodb://localhost/bidding');
mongoose.Promise = global.Promise;

module.exports = function(app){

  Company.count({}, function(err, count){
    process.env.COMPANIES = count;
  })

  //Register the new company
  app.post('/phase', urlencoderParser, function(req, res){
    process.env.PHASE = 2;
    res.send(process.env.PHASE);
  });

  //Get the blocks
  app.get('/blocks', function(req, res){
    Block.find({}).sort({name: 1}).then(function(block){
      res.json(block);
    });
  });

  //Set the page for add blocks
  app.get('/blocks/new', function(req, res){
    Block.find({}).sort({name: 1}).then(function(block){
      res.render('blocksView');
    });
  });

  //Save a block
  app.post('/blocks/new', urlencoderParser, function(req, res){
    var newBlock = Block(req.body);
    newBlock.save(function(err){
      if (err) {
        console.log('error: ' + err);
      }
      res.json(newBlock);
    });
  });

  //Get the resumes and round number
  app.get('/resumeData', function(req, res){
    Resume.find({}).sort({round: -1, company: 1}).then(function(resumes){
      res.json({round: process.env.ROUND, companies: process.env.COMPANIES, resumes: resumes});
    });
  });

  //Get all the companies
  app.get('/companies', function(req, res){
    Company.find({}).then(function(companies){
      res.send(companies);
    })
  });

  //Render the login page
  app.get('/login', function(req, res){
      res.render('loginView');
  });

//Register the new company
app.post('/login', urlencoderParser, function(req, res){
  var newCompany = Company(req.body);
  Company.count({name: req.body.name}, function(err, count){
    if (count === 0){
      newCompany.save(function(err){
        if (err) {
          console.log('error: ' + err);
        }
        Company.count({}, function(err, count){
          process.env.COMPANIES = count;
        })
      });
    }
    res.json(newCompany);
  });

});

//handle eligibility decrement
//Register the new company
app.post('/eligibility', urlencoderParser, function(req, res){
  Company.findOneAndUpdate({name: req.body.company}, {$inc: {eligibility: -1}}, function(err, company){
    if(err) console.log(err);
    res.send(company);
  });
});

  //Send the data for the actual round, blocks and prices, dispensation and Eligibility
  //{[block, actualPrice], dispensation, eligibility}
  app.get('/bidding/:name', function(req, res){
    //Search for all the blocks
    Block.find({}).sort({name: 1}).then(function(blocks){
      var blocksRes = [];
      blocks.forEach(function(block){
        blocksRes.push({name: block.name, actualPrice: block.actualPrice, company: block.company});
      });
      Company.findOne({name: req.params.name}).then(function(company){
        res.render('biddingView', {blocks: blocksRes, dispensation: company.dispensation, eligibility: company.eligibility, company: req.params.name, round: process.env.ROUND, increment: process.env.INCREMENT, phase: process.env.PHASE});
      });
    });
  });

  //Send all the information of all the rounds
  app.get('/resume', function(req, res){
    res.render('resumeView');
  });

  //Send control page
  app.get('/control', function(req, res){
    res.render('controlView');
  });

  //Save a bid from a specific Company {company, block, amount}
  app.post('/bids', urlencoderParser, function(req, res){
    var newBid = Bid(req.body);
    newBid.time = new Date().getTime();
    newBid.round = parseFloat(process.env.ROUND) + 1;
    newBid.save(function(err){
      if (err) {
        console.log('error: ' + err);
        res.send(err);
      }
      res.json(newBid);
    });
  });

  //Rest the dispensation from a company
  app.put('/dispensation/:comp', function(req, res){
    Company.findOneAndUpdate({name: req.params.comp}, {$inc: {dispensation: -1}}, function(err, company){
      if(err) console.log(err);
      res.send(company);
    });

  });

}
