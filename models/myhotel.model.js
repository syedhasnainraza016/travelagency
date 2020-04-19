const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let MyHotelSchema = new Schema(
  {
    roll: { type: Number, required: true },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("MyHotel", MyHotelSchema);
