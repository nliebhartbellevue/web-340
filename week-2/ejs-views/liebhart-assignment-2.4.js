/**
 * Title: Assignment 2.4
 * Author: Nathaniel Liebhart
 * Date: August 19th, 2019
 * Description: Creates a Node.js server and returns the index.ejs page
 */

// require modules
const http = require("http");
const express = require("express");
const path = require("path");

// init express
let app = express();

// declare view DIR
app.set("views", path.resolve(__dirname, "views"));
// declare EJS as view engine
app.set("view engine", "ejs");

/**
 * Returns: index.ejs
 */
app.get("/", (req, res) => {
  res.render("index", {
    firstName: "Nathaniel",
    lastName: "Liebhart",
    address: "Roseland, NE"
  });
});

/**
 * Creates a new server that listens on PORT 8080
 */
http.createServer(app).listen(8080, () => {
  console.log("EJS-Views app started on port 8080!");
});
