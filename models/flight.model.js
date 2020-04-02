const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FlightSchema = new Schema(
  {
    no: { type: Number, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Flight", FlightSchema);
