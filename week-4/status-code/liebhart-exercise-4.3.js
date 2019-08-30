/**
 * Title: Exercise 4.3
 * Author: Nathaniel Liebhart
 * Date: August 30, 2019
 * Description: HTTP Status Codes
 */

const express = require("express");
const http = require("http");

const app = express();

app.get("/not-found", (req, res) => {
  res.status(404);
  res.json({
    error: "Page Not Found!"
  });
});

app.get("/ok", (req, res) => {
  res.status(200);
  res.json({
    message: "Welcome!"
  });
});

app.get("/not-implemented", (req, res) => {
  res.status(501);
  res.json({
    error: "!Under Construction!"
  });
});

http.createServer(app).listen(8080, () => {
  console.log("Application started on port 8080");
});
