const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

console.log("App listening on port 9000");

app.listen(9000);