/*
============================================
 Title:  app.js
 Author: Professor Krasso
 Modified By: Nathaniel Liebhart
 Date:   August 13th, 2019
 Description: Creates a new server and  listens
              on port 8080.
===========================================
*/

var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello World");
});

http.createServer(app).listen(8080);
