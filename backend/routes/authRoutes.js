const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Protected route
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;

