const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ResturantSchema = new Schema(
  {
    roll: { type: Number, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Resturant", ResturantSchema);
