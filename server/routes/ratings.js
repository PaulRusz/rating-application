const express = require("express");
const router = express.Router();
const Rating = require("../models/rating.js");
const User = require("../models/user.js");
const { decode } = require("../utils/auth");

// Middleware to verify token and get user ID
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = decode(token);
    req.userId = decoded.data._id;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// POST route to add a new rating
router.post("/ratings", async (req, res) => {
  const { category, name, rating, comment } = req.body;

  try {
    const userId = req.userId;

    const newRating = new Rating({
      category,
      itemName: name,
      rating,
      user: userId,
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
router.get("/api/rate", async (req, res) => {
  try {
    const decoded = decode(token); // Verify and decode the token
    const userId = decoded.data._id; // Extract user ID from decoded token

    const ratings = await Rating.find({ user: userId }); // Fetch ratings by user ID

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ error: "No ratings found for this user" });
    }

    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings by user ID:", error);
    res.status(500).json({ error: "Failed to fetch ratings" });
  }
});

// may not need this. replacing it.
// router.get("/api/rate/:username", async (req, res) => {
//   try {
//     // Find the user by their username
//     const user = await User.findOne({ username: req.params.username });
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     // Find ratings by user ID
//     const ratings = await Rating.find({ user: user._id });
//     res.status(200).json(ratings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to find ratings." });
//   }
// });

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

// GET route to fetch a single rating by ID
router.get("/ratings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const rating = await Rating.findById(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found." });
    }
    res.status(200).json(rating);
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ error: "Failed to fetch rating." });
  }
});

// GET route to search ratings by name
router.get("/ratings", async (req, res) => {
  const { name } = req.query;
  try {
    const ratings = await Rating.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(ratings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error occurred while searching for rating." });
  }
});

// DELETE route to delete a rating by id
router.delete("/ratings/:id", async (req, res) => {
  try {
    const ratingId = req.params.id;
    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.setMaxListeners(200).json({ message: "Rating deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rating", error });
  }
});

// PUT route to edit a rating
router.put("/ratings/:id", async (req, res) => {
  try {
    const ratingId = req.params.id;
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      {
        rating: req.body.rating,
        comment: req.body.comment,
        itemName: req.body.itemName,
        category: req.body.category,
      },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found." });
    }

    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: "Error updating the rating.", error });
  }
});

module.exports = router;

// CODE DOES NOT APPEAR TO WORK.  DOES NOT ALLOW THE HOMEPAGE TO LOAD AND GIVES A < ERROR

// const express = require("express");
// const router = express.Router();
// const Rating = require("../models/rating.js");
// const User = require("../models/user.js"); // Import the User model if needed.

// // POST route to add a new rating
// router.post("/ratings", async (req, res) => {
//   const { category, name, rating, username, comment } = req.body;

//   try {
//     const newRating = new Rating({
//       category,
//       itemName: name,
//       rating,
//       username,
//       comment,
//     });
//     await newRating.save();
//     res.status(201).json({ message: "Rating added!" });
//   } catch (error) {
//     console.error("Error adding rating:", error); // Log detailed error
//     res.status(500).json({ error: "Failed to add rating." });
//   }
// });

// // GET route to fetch all ratings by username
// router.get("/api/rate/:username", async (req, res) => {
//   try {
//     const ratings = await Rating.find({ username: req.params.username });

//     if (!ratings || ratings.length === 0) {
//       return res.status(404).json({ error: "No ratings found for this user" });
//     }

//     res.status(200).json(ratings);
//   } catch (error) {
//     console.error("Error fetching ratings by username:", error);
//     res.status(500).json({ error: "Failed to fetch ratings" });
//   }
// });

// // GET route to fetch recent and top ratings
// router.get("/ratings/:id", async (req, res) => {
//   const { id, name } = req.query;

//   try {
//     // If `id` is provided, fetch by ID
//     if (id) {
//       const rating = await Rating.findById(id);
//       if (!rating) {
//         return res.status(404).json({ error: "Rating not found." });
//       }
//       return res.status(200).json(rating);
//     }

//     // If `name` is provided, search by name
//     if (name) {
//       const ratings = await Rating.find({
//         itemName: { $regex: name, $options: "i" },
//       });
//       return res.status(200).json(ratings);
//     }

//     // If neither `id` nor `name` are provided, return recent ratings
//     const recentRatings = await Rating.find().sort({ createdAt: -1 }).limit(5);
//     res.status(200).json(recentRatings);
//   } catch (error) {
//     console.error("Failed to fetch ratings:", error);
//     res.status(500).json({ error: "Failed to fetch rating." });
//   }
// });

// // GET route to fetch top ratings
// router.get("/top20", async (req, res) => {
//   try {
//     const topRatings = await Rating.find().sort({ rating: -1 }).limit(20);
//     res.status(200).json(topRatings);
//   } catch (error) {
//     console.error("Failed to find top 20 ratings:", error);
//     res.status(500).json({ error: "Failed to find top 20 ratings." });
//   }
// });

// // GET route to fetch ratings by category
// router.get("/items", async (req, res) => {
//   const { category } = req.query;
//   console.log("Category received:", category);

//   try {
//     const items = await Rating.find({
//       category: { $regex: new RegExp(`^${category}$`, "i") },
//     }).sort({ rating: -1 });
//     console.log("Items fetched:", items);
//     res.status(200).json(items);
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).json({ error: "Failed to find items" });
//   }
// });

// // DELETE route to delete a rating by id
// router.delete("/ratings/:id", async (req, res) => {
//   try {
//     const ratingId = req.params.id;
//     const deletedRating = await Rating.findByIdAndDelete(ratingId);

//     if (!deletedRating) {
//       return res.status(404).json({ message: "Rating not found" });
//     }

//     res.status(200).json({ message: "Rating deleted!" });
//   } catch (error) {
//     console.error("Error deleting rating:", error);
//     res.status(500).json({ message: "Error deleting rating", error });
//   }
// });

// // PUT route to edit a rating
// router.put("/ratings/:id", async (req, res) => {
//   try {
//     const ratingId = req.params.id;
//     const updatedRating = await Rating.findByIdAndUpdate(
//       ratingId,
//       {
//         rating: req.body.rating,
//         comment: req.body.comment,
//         itemName: req.body.itemName,
//         category: req.body.category,
//       },
//       { new: true }
//     );

//     if (!updatedRating) {
//       return res.status(404).json({ message: "Rating not found." });
//     }

//     res.status(200).json(updatedRating);
//   } catch (error) {
//     console.error("Error updating the rating:", error);
//     res.status(500).json({ message: "Error updating the rating.", error });
//   }
// });

// module.exports = router;
