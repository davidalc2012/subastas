var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Company = require('../models/company');
var Bid = require('../models/bid');
var Block = require('../models/block');
var Resume = require('../models/resume');
var urlencoderParser = bodyParser.urlencoded({extended: false});


//TODO change the IP
mongoose.connect('mongodb://localhost/biding');
mongoose.Promise = global.Promise;

module.exports = function(app){

  //Get the blocks
  app.get('/blocks', function(req, res){
    Block.find({}).sort({name: 1}).then(function(block){
      res.json(block);
    });
  });

  //Get the resumes
  app.get('/resumeData', function(req, res){
    Resume.find({}).sort({company: 1}).then(function(resumes){
      res.json(resumes);
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
  newCompany.save(function(err){
    if (err) {
      console.log('error: ' + err);
    }
    res.json(newCompany);
  });
});

  //Send the data for the actual round, blocks and prices, dispensation and Eligibility
  //{[block, actualPrice], dispensation, eligibility}
  app.get('/bidding/:name', function(req, res){
    //Search for all the blocks
    Block.find({}).sort({name: 1}).then(function(blocks){
      var blocksRes = [];
      blocks.forEach(function(block){
        blocksRes.push({name: block.name, actualPrice: block.actualPrice});
      });
      Company.findOne({name: req.params.name}).then(function(company){
        // if (!aux){
        //   aux = Company({name: req.params.name}).save(function(err, data){
        //       if (err) console.log('Creating error');
        //       aux = data;
        //       console.log('Auxiliar 2: ', aux);
        //   });
        // }
        res.render('biddingView', {blocks: blocksRes, dispensation: company.dispensation, eligibility: company.eligibility});
        //}

      });
    });
  });

  //Send all the information of all the rounds
  //
  app.get('/resume', function(req, res){
    //TODO assamble the resume
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
    console.log(req.params.comp);
    Company.findOneAndUpdate({name: req.params.comp}, {$inc: {dispensation: -1}}, function(err, company){
      if(err) console.log(err);
      res.send(company);
    });

  });

}
