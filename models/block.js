const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const BlockSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  initialPrice: {
    type: Number,
    default: 100
  },
  actualPrice: {
    type: Number,
    default: 100
  },
  //TODO check if is better getting the CompanySchema here
  company: {
    type: String
  },
  //TODO check if is necesary the minBid in here
  minBid: {
    type: Number
  }
});

const Block = mongoose.model('block', BlockSchema);

module.exports = Block;
