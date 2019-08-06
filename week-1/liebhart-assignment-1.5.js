/**
 * Title: Assignment 1.5 - Hello World
 * Author: Nathaniel Liebhart
 * Date: August 6th, 2019
 * Description: Recreate Node Server
 */

/**
 * Params: firstName, lastName, assignment
 * Response: output
 * Description: Return formatted header string
 */
const header = require("../liebhart-header");
console.log(header("Nathaniel", "Liebhart", "Assignment 1.5") + "\n");

// Variable declaration
const http = require("http");

const processRequest = (req, res) => {
  let body = "Hello World, my name is Nathaniel Liebhart";
  let contentLength = body.length;

  res.writeHead(200, {
    "Content-Length": contentLength,
    "Content-Type": "text/plain"
  });

  res.end(body);
};

const server = http.createServer(processRequest);

server.listen(8080);
