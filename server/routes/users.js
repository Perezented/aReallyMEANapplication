const express = require("express");
const router = express.Router();

// Register

router.get("/register", (req, res) => {
  res.send("Register page");
});

// Authentication
router.get("/authenticate", (req, res) => {
  res.send("Authenticate page");
});

// Profile
router.get("/profile", (req, res) => {
  res.send("Profile page");
});

// Validate
router.get("/validate", (req, res) => {
  res.send("Validate page");
});

module.exports = router;
