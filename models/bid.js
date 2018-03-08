const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model
const BidSchema = new Schema({
  //TODO check if is better to use the Company and Block Schemas
  company: {
    type: String,
    required: [true, "Name field is required"]
  },
  block: {
    type: String,
    required: [true, "Block field is required"]
  },
  amount: {
    type: Number,
    required: [true, "Amount field is required"]
  },
  time: {
    type: String
  }
});

const Bid = mongoose.model('bid', BidSchema);

module.exports = Bid;
