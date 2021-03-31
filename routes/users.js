const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/users.js");
const dbconfig = require("../config/database");

// get to users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.getAllUsers((err, data) => {
      if (err) throw err;
      res.json({
        users: data,
        success: true,
        msg: "/ was used to get to users"
      });
    });
  }
);

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
    console.log("user: ", user);
    if (user == "" || user == null || user == undefined) {
      return res.json({
        success: false,
        msg:
          "It seems we recieved no username, please check username and try again."
      });
    }
    if (!user) {
      return res.json({
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
          token: token,
          msg: "Successful login",
          success: true
        });
      } else {
        //otherwise, wrong password
        return res.json({
          success: false,
          msg: "Password does not match the password in our systems."
        });
      }
    });
  });
});
// a function to create a token and return it
function createToken(user) {
  const secret = dbconfig.secret;
  const payload = {
    subject: user.id,
    username: user.username,
    success: user.success
  };
  const options = {
    expiresIn: "6h"
  };
  return jwt.sign(payload, secret, options);
}

// Profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    console.log("in profile");
    console.log(req);
    res.status(200).json({ user: req.user });
  }
);

// Validate
router.get("/validate", (req, res) => {
  res.send("Validate page");
});

module.exports = router;
