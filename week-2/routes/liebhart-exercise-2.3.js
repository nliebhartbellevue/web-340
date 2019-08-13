/**
 * Title: Exercise 2.3 - routes
 * Author: Professor Krasso
 * Modified By: Nathaniel Liebhart
 * Date: August 13th, 2019
 * Description: Demonstate Express route behaviors
 */

const express = require("express");
const http = require("http");

const app = express();

// GET - /
app.get("/", (req, res) => {
  res.end("Welcome to the homepage!");
});

// GET - /about
app.get("/about", (req, res) => {
  res.end("Welcome to the about page!");
});

// GET - /contact
app.get("/contact", (req, res) => {
  res.end("Welcome to the contact page!");
});

// handle error with a 404
app.use((req, res) => {
  res.statusCode = 404;
  res.end("404!");
});

// Create server - listen on PORT 8080
http.createServer(app).listen(8080);
