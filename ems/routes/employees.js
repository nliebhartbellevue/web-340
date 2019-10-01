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
// User Model
let User = require("../models/user");

// Add New Employee Route
router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("new", {
    title: "Add New Employee"
  });
});

// Add New Employee Process
router.post("/new", (req, res) => {
  req.checkBody("fName", "First Name is a required field!").notEmpty();

  // Get errors
  let errors = req.validationErrors();

  if (errors) {
    res.render("new", {
      title: "Add New Employee",
      errors
    });
  } else {
    let employee = new Employee();
    employee.user = req.user._id;
    employee.fName = req.body.fName;
    employee.lName = req.body.lName;
    employee.phone = [req.body.work, req.body.mobile, req.body.home];
    employee.email = req.body.email;

    employee.save(err => {
      if (err) {
        console.error(err);
        return;
      } else {
        req.flash("success", "New Employee Added");
        res.redirect("/");
      }
    });
  }
});

// Load Edit Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    if (employee.user != req.user._id) {
      req.flash("danger", "Not Authorized!");
      res.redirect("/");
    }
    res.render("edit", {
      title: `Edit ${employee.fName} ${employee.lName}`,
      employee
    });
  });
});

// Update Employee Process
router.post("/edit/:id", (req, res) => {
  let employee = {};
  employee.fName = req.body.fName;
  employee.lName = req.body.lName;
  employee.phone = [req.body.work, req.body.mobile, req.body.home];
  employee.email = req.body.email;

  let query = { _id: req.params.id };

  Employee.update(query, employee, err => {
    if (err) {
      console.error(err);
      return;
    } else {
      req.flash("success", "Employee updated!");
      req.redirect("/");
    }
  });
});

// Delete Employee
router.delete("/:id", (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
    console.log("Bad User ID!");
  }

  let query = { _id: req.params.id };

  Employee.findById(req.params.id, (err, employee) => {
    if (employee.user != req.user._id) {
      res.status(500).send();
    } else {
      Employee.remove(query, err => {
        if (err) {
          console.error(err);
        }
        res.send("Success");
      });
    }
  });
});

// Get Single Employee
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    User.findById(employee.user, (err, user) => {
      res.render("view", {
        title: `${employee.fName} ${employee.lName}`,
        employee
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please Login First!");
    res.redirect("/users/login");
  }
}

module.exports = router;
