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
 * Request: query
 * Response: view.ejs, Employee[] | index.ejs
 * URL: localhost:8080/view/:query
 */
router.get("/view/:query", (req, res) => {
  const query = req.params["query"];

  Employee.find({ name: query }, (err, employees) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employees);

      if (employees.length > 0) {
        res.render("view", {
          title: "EMS | View",
          employee: employees
        });
      } else {
        res.redirect("/");
      }
    }
  });
});

// Load Edit Form
// router.get("/edit/:id", ensureAuthenticated, (req, res) => {
//   Employee.findById(req.params.id, (err, employee) => {
//     if (employee.user != req.user._id) {
//       req.flash("danger", "Not Authorized!");
//       res.redirect("/");
//     }
//     res.render("edit", {
//       title: `Edit ${employee.fName} ${employee.lName}`,
//       employee
//     });
//   });
// });

// Update Employee Process
// router.post("/edit/:id", (req, res) => {
//   let employee = {};
//   employee.fName = req.body.fName;
//   employee.lName = req.body.lName;
//   employee.phone = [req.body.work, req.body.mobile, req.body.home];
//   employee.email = req.body.email;

//   let query = { _id: req.params.id };

//   Employee.update(query, employee, err => {
//     if (err) {
//       console.error(err);
//       return;
//     } else {
//       req.flash("success", "Employee updated!");
//       req.redirect("/");
//     }
//   });
// });

// Delete Employee
// router.delete("/:id", (req, res) => {
//   if (!req.user._id) {
//     res.status(500).send();
//     console.log("Bad User ID!");
//   }

//   let query = { _id: req.params.id };

//   Employee.findById(req.params.id, (err, employee) => {
//     if (employee.user != req.user._id) {
//       res.status(500).send();
//     } else {
//       Employee.remove(query, err => {
//         if (err) {
//           console.error(err);
//         }
//         res.send("Success");
//       });
//     }
//   });
// });

// Get Single Employee
// router.get("/:id", (req, res) => {
//   Employee.findById(req.params.id, (err, employee) => {
//     User.findById(employee.user, (err, user) => {
//       res.render("view", {
//         title: `${employee.fName} ${employee.lName}`,
//         employee
//       });
//     });
//   });
// });

module.exports = router;
