/**
 * Title: employees.js
 * Author: Nathaniel Liebhart
 * Date: September 30, 2019
 * Description: This page acts as the routing and business logic for the employee routes and model
 */

const express = require("express");
const router = express.Router();

// Employee Model
let Employee = require("../models/employee");

/**
 * Description: Redirects users to the 'new' page
 * Type: GET
 * Request: n/a
 * Response: new.ejs
 * URL: localhost:8080/new
 */
router.get("/new", (req, res) => {
  res.render("new", {
    title: "EMS | New"
  });
});

/**
 * Description: Processes form submission
 * Type: POST
 * Request: fName, lName, phone[], email
 * Response: index.ejs
 * URL: localhost:8080/process
 */
router.post("/process", (req, res) => {
  if (!req.body.fName) {
    res.status(400).send("Employee must have a First Name!");
  }
  if (!req.body.lName) {
    res.status(400).send("Employee must have a Last Name!");
  }

  // get the request's form data
  const fName = req.body.fName;
  const lName = req.body.lName;
  const phone = [req.body.work, req.body.mobile, req.body.home];
  const email = req.body.email;

  // create a employee model
  let employee = new Employee({
    fName,
    lName,
    phone,
    email
  });

  // save new employee record to the database
  employee.save(err => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(`Employee: ${fName} ${lName} has been successfully saved!`);
      res.redirect("/");
    }
  });
});

/**
 * Description: Redirects users to the home page
 * Type: GET
 * Request: _id
 * Response: view.ejs, Employee[] | index.ejs
 * URL: localhost:8080/view/:id
 */
router.get("/view/:id", (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employee);

      res.render("view", {
        title: `EMS | View | ${employee.fName} ${employee.lName}`,
        employee
      });
    }
  });
});

/**
 * Description: Updates the Employee record
 * Type: POST
 * Request: fName, lName, phone, email
 * Response: index.ejs
 * URL: localhost:8080/edit/:id
 */
router.post("/edit/:id", (req, res) => {
  // Create a temp employee object
  let employee = {};
  employee.fName = req.body.fName;
  employee.lName = req.body.lName;
  employee.phone = [req.body.work, req.body.mobile, req.body.home];
  employee.email = req.body.email;

  // set query equal to _id
  let query = { _id: req.params.id };

  // use mongoose to find employee record and update
  Employee.update(query, employee, err => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
