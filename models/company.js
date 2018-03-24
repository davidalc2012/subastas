const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const CompanySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  dispensation: {
    type: Number,
    default: 1
  },
  eligibility: {
    type: Number,
    default: 2
  }
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;
