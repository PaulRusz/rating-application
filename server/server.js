require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth.js");
const ratingRoutes = require("./routes/ratings.js");

const mongoURI = process.env.MONGODB_URI;

console.log(process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ratethis.netlify.app",
      /https:\/\/[0-9a-f]{8,}--ratethis\.netlify\.app/,
    ],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Use authentication routes
app.use("/api", authRoutes);

// Use Rating routes
app.use("/api", ratingRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/client/dist")));

// Catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/client/dist", "index.html"));
});

// Start the server!
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
