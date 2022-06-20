const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contact: {
      type: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    Posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    Gender: {
      type: String,
      enum: ["Male", "Female", "DND"],
    },
    userType: {
      type: String,
      enum: ["user", "Host"],
      default: "user",
    },
    rentals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental",
      },
    ],
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//used to make combination of fields unique
userSchema.index({ firstname: 1, lastname: 1 }, { unique: true });

module.exports = mongoose.model("user", userSchema);
