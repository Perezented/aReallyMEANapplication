const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const users = require("./routes/users");

const port = 3007;

// CORS Middleware
app.use(cors());

// Setting static folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

app.use("/users", users);

// main index route
app.get("/", (req, res) => {
  res.send(
    "You got to the / of this local host page. Welcome to the empty home page."
  );
});
// Message for server start
app.listen(port, () => {
  console.log("Server started on localhost:" + port);
});
