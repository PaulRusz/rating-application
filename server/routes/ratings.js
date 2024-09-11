const express = require("express");
const router = express.Router();
const Rating = require("../models/rating.js");
const User = require("../models/user.js"); //

// POST route to add a new rating
router.post("/ratings", async (req, res) => {
  const { category, name, rating, username, comment } = req.body;

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
      comment,
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

// GET route to fetch most recent ratings
router.get("/ratings", async (req, res) => {
  try {
    const recentRatings = await Rating.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(recentRatings);
  } catch (error) {
    res.status(500).json({ error: "Failed to find recent ratings." });
  }
});

// GET route to fetch top ratings
router.get("/top20", async (req, res) => {
  try {
    const topRatings = await Rating.find().sort({ rating: -1 }).limit(20);
    res.status(200).json(topRatings);
  } catch (error) {
    res.status(500).json({ error: "Failed to find top 20 ratings." });
  }
});

// GET route to fetch ratings by category
router.get("/items", async (req, res) => {
  const { category } = req.query;
  console.log("Category received:", category);

  try {
    const items = await Rating.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    }).sort({ rating: -1 });
    console.log("Items fetched:", items);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Failed to find items" });
  }
});

module.exports = router;
