const mongoose = require('mongoose');
const Company = require('./models/company');
//TODO import controllers
//var todoController = require('./controllers/todoController');

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to data base before test runs
//TODO change the IP
mongoose.connect('mongodb://localhost/bidding');

mongoose.connection.once('open', function(){
  console.log('Connection has been made');
}).on('error', function(err){
  console.log('Connection error: ', err);
});
/*
mongoose.connection.collections.companies.drop(function(err){
  if (err) console.log('Deleting error: ', err);
  console.log('Elements deleted');
});

var company1 =new Company({
    name: 'A',
    eligibility: 1,
});

Company.create(company1, function(err, data){
  if (err) console.log('Creating error');
  //console.log(data);
});

var company2 =new Company({
    name: 'B',
    eligibility: 2,
});

Company.create(company2, function(err, data){
  if (err) console.log('Creating error');
  //console.log(data);
});

var company3 =new Company({
    name: 'C',
    eligibility: 3,
});

Company.create(company3, function(err, data){
  if (err) console.log('Creating error');
  //console.log(data);
});
*/


// Company.find({}).then(function(companies){
//     console.log(companies);
// });

Company.find({}).sort({eligibility: -1}).limit(3).exec(function(err, company){
  console.log(company[0].name);
});
