var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Company = require('../models/company');
var Bid = require('../models/bid');
var Block = require('../models/block');
var urlencoderParser = bodyParser.urlencoded({extended: false});

mongoose.connect('mongodb://localhost/biding');
mongoose.Promise = global.Promise;
