const express = require("express");
const router = express.Router();
const Rating = require("../models/rating.js");
const User = require("../models/user.js"); //

// POST route to add a new rating
router.post("/rate", async (req, res) => {
  const { category, name, rating, username, comments } = req.body;

  try {
    // IGNORE FOR NOW - MAY NOT NEED TO VERIFY IF USER EXISTS HERE WHEN SUBMITTING A RATING
    // const user = await User.findOne(username);
    // if (!user) {
    //   return res.status(400).json({ error: "User not found" });
    // }

    const newRating = new Rating({
      category,
      itemName: name,
      rating,
      username,
      comments,
    });
    await newRating.save();
    res.status(201).json({ message: "Rating added!" });
  } catch (error) {
    console.error("Error adding rating:", error); // Log detailed error
    res.status(500).json({ error: "Failed to add rating." });
  }
});

// GET route to fetch all ratings by user
router.get("/api/rate/:username", async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Find ratings by user ID
    const ratings = await Rating.find({ user: user._id });
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: "Failed to find ratings." });
  }
});

module.exports = router;
