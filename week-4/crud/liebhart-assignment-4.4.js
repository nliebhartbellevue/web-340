/**
 * Title: Assignment 4.4
 * Author: Nathaniel Liebhart
 * Date: August 30, 2019
 * Description: cURL
 */

const express = require("express");
const http = require("http");

const app = express();

// GET: index
app.get("/", (req, res) => {
  res.send("API invoked as an HTTP GET request.");
});

// PUT: index
app.put("/", (req, res) => {
  res.send("API invoked as an HTTP PUT request.");
});

// POST: index
app.post("/", (req, res) => {
  res.send("API invoked as an HTTP POST request.");
});

// DELETE: index
app.delete("/", (req, res) => {
  res.send("API invoked as an HTTP DELETE request.");
});

http.createServer(app).listen(8080, () => {
  console.log("Application started on port 8080");
});
