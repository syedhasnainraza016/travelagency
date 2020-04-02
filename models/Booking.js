const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
 FName: {         
    type: String,
    required: true
  },
LName: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  Flight: {
    type: String,
    required: true
  },
  Hotel: {
    type: String,
    required: true
  },
  Bus: {
    type: String,
    required: true
  },
  Resturant: {
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

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
