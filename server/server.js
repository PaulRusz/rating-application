require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const path = require("path"); // <-- Make sure to include this

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Your API routes go here
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, profileName, email, password } = req.body;

    // Password validation on the server
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 6 characters long, include at least one uppercase letter, and one number.",
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      profileName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user." });
  }
});

// LOGIN CODE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User was not found" });
    }
    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // If user info matches, send success response
    // Return the token
    return res.json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Serve static files from the React app (client/build folder)
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all route: Send all other requests to React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
