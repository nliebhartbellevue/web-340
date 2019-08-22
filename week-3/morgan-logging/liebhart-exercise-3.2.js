/**
 * Title: Exercise 3.2 - morgan-logging
 * Author: Nathaniel Liebhart
 * Date: August 22, 2019
 * Description: Demonstrates hot to configure the Morgan logger
 */

const express = require("express");
const http = require("http");
const path = require("path");
const logger = require("morgan");

// init express
const app = express();

// Set views dir and set ejs as vie engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Tell express to use morgan as the logger (short)
app.use(logger("short"));

// Render index.ejs
app.get("/", (req, res) => {
  res.render("index", {
    message: "Exercise 3.2 - Morgan Logging Application"
  });
});

// Create server on localhost:8080
http.createServer(app).listen(8080, () => {
  console.log("Morgan Logger Application started on port 8080");
});
