/**
 * Title: Exercise 1.3 - Modules
 * Author: Nathaniel Liebhart
 * Date: August 6th, 2019
 * Description: Demonstrate how to use modules
 */

/**
 * Params: firstName, lastName, assignment
 * Response: output
 * Description: Returns a formatted header string
 */
const header = require("../liebhart-header");
console.log(header("Nathaniel", "Liebhart", "Exercise 1.3") + "\n");

// Require the url module
const url = require("url");
let parsedURL = url.parse(
  "https://www.github.com/nliebhartbellevue?name=liebhart"
);

// Print url segments to the console
console.log("Protocol: " + parsedURL.protocol);
console.log("Host: " + parsedURL.host);
console.log("Query: " + parsedURL.query);
