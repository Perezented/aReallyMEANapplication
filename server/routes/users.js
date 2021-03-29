const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const dbconfig = require("../config/database");

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
router.post("/login", (req, res, next) => {
  // User sent in creds
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    // Check to make sure user is an existing user
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User is not found in out system. Would you like to register?"
      });
    }
    // If user exists
    // Check to see if password matches
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = createToken(user);
        res.status(200).json({
          user,
          session: req.session,
          token: token
        });
      } else {
        //otherwise, wrong password
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});
// a function to create a token and return it
function createToken(user) {
  const secret = dbconfig.secret;
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "6h"
  };
  return jwt.sign(payload, secret, options);
}
// Profile
router.get("/profile", (req, res) => {
  res.send("Profile page");
});

// Validate
router.get("/validate", (req, res) => {
  res.send("Validate page");
});

module.exports = router;
