const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.data;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token." });
  }
};

module.exports = authMiddleware;
