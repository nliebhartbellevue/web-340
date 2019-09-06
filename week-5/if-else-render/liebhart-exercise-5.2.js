/**
 * Title: Exercise 5.2
 * Author: Nathaniel Liebhart
 * Date: September 6th, 2019
 * Description: Demonstrates EJS 'if-else-render' operations
 */

const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var names = ["John", "Bob", "Jane", "Jill", "Jim"];

app.get("/", (req, res) => {
  res.render("index", {
    names
  });
});

http.createServer(app).listen(8080, () => {
  console.log("Express App started on port 8080!");
});
