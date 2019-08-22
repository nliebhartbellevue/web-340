/**
 * Title: Exercise 3.3 - Advanced Routing
 * Author: Nathaniel Liebhart
 * Date: August 22, 2019
 * Description: Demonstrates advanced routing
 */

const express = require("express");
const http = require("http");
const path = require("path");
const logger = require("morgan");

// init express
const app = express();

// Set views dir and tell express to use ejs as the view engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Tell express to use morgan as the logger (short)
app.use(logger("short"));

// Render index.ejs with the employeeId as a dynamic parameter
app.get("/:employeeId", (req, res) => {
  let employeeId;
  employeeId = parseInt(req.params.employeeId, 10);

  res.render("index", {
    employeeId
  });
});

// Create server on localhost:8080
http.createServer(app).listen(8080, () => {
  console.log("Advance Routing Application listening on port 8080");
});
