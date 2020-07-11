const mongoose = require("mongoose");

const JobformSchema = new mongoose.Schema({
 FName: {         
    type: String,
    required: true
  },
LName: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  Area: {
    type: String,
    required: true
  },
  Education: {
    type: String,
    required: true
  },
  Rank: {
    type: String,
    required: true
  },
  PhoneNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Jobform = mongoose.model("Jobform", JobformSchema);

module.exports = Jobform;
