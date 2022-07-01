const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = Schema({
  apartmentType: {
    type: String,
    enum: ["Flat", "Bungalow"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  roomType: {
    type: String,
    enum: ["Entire Apartment", "Private Room", "1-Room", "2-Room", "3+ Rooms"],
  },
  vacancy: {
    type: Number,
    default: 1,
  },
  rent: {
    type: Number,
    required: true,
  },
  location: {
    apartmentNumber: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: Number },
    country: { type: String },
  },
});

module.exports = mongoose.model("Rental", rentalSchema);
