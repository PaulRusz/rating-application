// Handles routes related to authentication (e.g., login, signup).

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters long, include at least one uppercase letter, and one number.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!",
      firstName: newUser.firstName,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("Login error: User not found");
      return res.status(401).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.error("Login error: Invalid password");
      return res.status(401).json({ error: "Invalid password" });
    }

    if (!JWT_SECRET) {
      console.error("Login error: Missing JWT_SECRET");
      return res.status(500).json({ error: "Server configuration error." });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION,
    });
    return res.json({ success: true, token, username: user.username });
  } catch (error) {
    console.error("Server error during login:", error); // This will log the specific error
    return res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;
