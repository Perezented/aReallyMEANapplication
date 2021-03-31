const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

// get user by id
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

// get by username
module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

// adding user and hashing password
module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

// compares the hashed password and the user inputed password to login
module.exports.comparePassword = function (canidatePassword, hash, callback) {
  bcrypt.compare(canidatePassword, hash, (err, isMatch) => {
    if (err)
      return res.status(401).json({
        Error:
          "The username and password combination was not found in our database.",
        err
      });
    callback(null, isMatch);
  });
};
