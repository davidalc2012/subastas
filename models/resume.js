const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const ResumeSchema = new Schema({
  block: {
    type: String,
    required: [true, "Block field is required"]
  },
  company: {
    type: String,
    required: [true, "Company field is required"]
  },
  finalPrice: {
    type: Number,
    required: [true, "Final price field is required"]
  }
  round: {
    type: Number
  }
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;
