const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let HotelSchema = new Schema(
  {
    no: { type: Number, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("Hotel", HotelSchema);
