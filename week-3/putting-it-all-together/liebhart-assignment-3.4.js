/**
 * Title: Assignment 3.4 - Putting It All Together
 * Author: Nathaniel Liebhart
 * Date: August 22, 2019
 * Description: Base server configuration for a fully working Express application
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

// Tell express to use morgan as the logger
app.use(logger("short"));

// GET : Home page at - /
app.get("/", (req, res) => {
  res.render("index", {
    message: "Welcome to the Home page!"
  });
});

// GET : About page at - /about
app.get("/about", (req, res) => {
  res.render("about", {
    message: "Welcome to the About page!"
  });
});

// GET : Contact page at - /
app.get("/contact", (req, res) => {
  res.render("contact", {
    message: "Welcome to the Contact page!"
  });
});

// GET : Products page at - /
app.get("/products", (req, res) => {
  res.render("products", {
    message: "Welcome to the Products page!"
  });
});

// Create server on localhost:8080
http.createServer(app).listen(8080, () => {
  console.log("Express application listening on port 8080");
});
