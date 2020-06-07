const express = require("express");
const ejs = require("ejs");
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Server open at " + port);
});
