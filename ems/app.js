const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Express to get views from views folder and use ejs as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Tell Express to serve static assets from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Morgan middleware
app.use(logger("short"));

// Test route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page"
  });
});

// Start Express server
app.listen(8080, () => {
  console.log("Express server is running on port 8080!");
});
