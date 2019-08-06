/*
============================================
; Title:  header.js
; Author: Professor Krasso 
; Date:   June 9th 2019
; Modified By: Nathaniel D. Liebhart
; Description: Displays a formatted header
;===========================================
*/

/**
 * Params: firstName, lastName, assignment
 * Response: output
 * Description: Returns a well-formatted string header
 */
display = (firstName, lastName, assignment) => {
  let output =
    "\n" +
    firstName +
    " " +
    lastName +
    "\n" +
    assignment +
    "\nDate: " +
    new Date().toLocaleDateString("en-US");

  return output;
};

module.exports = display;
