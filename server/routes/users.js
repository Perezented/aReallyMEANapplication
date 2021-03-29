const express = require("express");
const router = express.Router();

// get to users
router.get("/", (req, res) => {
  res.status(200).send("Users page exists here.");
});

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
