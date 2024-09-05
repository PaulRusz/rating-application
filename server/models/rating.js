// A model for storing ratings, including fields like category, itemName, rating, user, etc.

const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
