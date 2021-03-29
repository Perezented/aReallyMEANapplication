const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// get to users
router.get("/", (req, res) => {
  res.status(200).send("Users page exists here.");
});

// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "User registered." });
    }
  });
});

// Authentication
router.post("/authenticate", (req, res) => {
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
