/**
 * Title: Exercise 5.3
 * Author: Nathaniel Liebhart
 * Date: September 6th, 2019
 * Description: Demonstrate the Pug view engine
 */

const express = require("express");
const http = require("http");
const pug = require("pug");
const path = require("path");

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    message: "Welcome to the Pug view engine!"
  });
});

http.createServer(app).listen(8082, () => {
  console.log("Express app listening on port 8082!");
});
