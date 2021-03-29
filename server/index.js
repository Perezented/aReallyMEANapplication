const express = require("express");

const app = express();

const port = 3007;

app.get("/", (req, res) => {
  res.send(
    "You got to the / of this local host page. Welcome to the empty home page."
  );
});

app.listen(port, () => {
  console.log("Server started on localhost:" + port);
});
