const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

// Connect to DB
mongoose.connect(config.database);
// On Connection, display message
mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});
// On error
mongoose.connection.on("error", (err) => {
  console.log("DB connection error " + err);
});

const app = express();

const users = require("./routes/users");

const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Setting static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

// main index route
app.get("/", (req, res) => {
  res.send(
    "You got to the / of this local host page. Welcome to the empty home page."
  );
});

// redirect all other traffic to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Message for server start
app.listen(port, () => {
  console.log("Server started on localhost:" + port);
});
