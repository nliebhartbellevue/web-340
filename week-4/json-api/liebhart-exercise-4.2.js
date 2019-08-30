/**
 * Title: Exercise 4.2
 * Author: Nathaniel Liebhart
 * Date: August 30, 2019
 * Description: JSON APIs
 */

const express = require("express");
const http = require("http");

const app = express();

app.get("/applicants/:id", (req, res) => {
  var id = parseInt(req.params.id, 10);

  res.json({
    name: "John",
    position: "Web Developer",
    skills: ["HTML", "CSS", "JS", "PHP", "Python"],
    background: "Passed",
    appID: id
  });
});

http.createServer(app).listen(8080, () => {
  console.log("Application started on port 8080");
});
