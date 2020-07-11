const mongoose = require("mongoose");

const AgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //for email verification
  //confirmed: {
    //type: DataTypes.BOOLEAN,
    //defaultValue: false,
  //},
  date: {
    type: Date,
    default: Date.now
  }
});

const Agent = mongoose.model("Agent", AgentSchema);

module.exports = Agent;
