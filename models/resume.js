const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const AmountSchema = new Schema({
  block: String,
  amount: Number
});

const ResumeSchema = new Schema({
  company: String,
  round: Number,
  amounts: [AmountSchema]
});

const Resume = mongoose.model('resume', ResumeSchema);

module.exports = Resume;
