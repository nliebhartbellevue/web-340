/**
 * Title: app.js
 * Author: Nathaniel Liebhart
 * Date: September 24, 2019
 * Description: Server file for ems application
 */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/database");

// Connect to MongoDB by way of Mongoose
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

// Check connection to mLab
db.once("open", () => {
  console.log("Connected to MongoDB cia mLab!");
});

// Check for database errors
db.on("error", err => {
  console.error(err);
});

// Set-up CSRF protection
let csrfProtection = csrf({ cookie: true });

// Init Express App
const app = express();

let Employee = require("./models/employee");

/**
 * Body Parser Middleware
 * parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Cookie Parser middleware
app.use(cookieParser());

// Helmet middleware
app.use(helmet.xssFilter());

// CSRF protection middleware
app.use(csrfProtection);

// Inspect all incoming request and add a CSRF token to the response
app.use((req, res, next) => {
  var token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

// Set Express to get views from views folder and use ejs as view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Tell Express to serve static assets from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Morgan middleware
app.use(logger("short"));

// Express Session middleware
app.use(
  session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
  })
);

// Express Messages middleware
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator middleware
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      var namespace = param.split("."),
        root = namespace.shift();
      formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg,
        value
      };
    }
  })
);

// Set PORT variable
app.set("port", process.env.PORT || 8080);

// Passport Config
require("./config/passport")(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Auth guard route
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/**
 * Description: Redirects users to Home page
 * Type: GET
 * Request: n/a
 * Response: index.ejs
 * URL: localhost:8080
 */
app.get("/", (req, res) => {
  Employee.find({}, (err, employees) => {
    User.findById(employees.user, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.render("index", {
          title: "EMS | Employees",
          employees,
          user
        });
      }
    });
  });
});

// Route files
let employees = require("./routes/employees");
let users = require("./routes/users");
app.use("/employees", employees);
app.use("/users", users);

// // GET: List all Employees
// app.get("/employees", (req, res) => {
//   res.render("list", {
//     title: "Employee List"
//   });
// });

// // POST: Add Ne Employee
// app.get("/employees/new", (req, res) => {
//   res.render("new", {
//     title: "Add New Employee"
//   });
// });

// // GET: View an Employee by id
// app.get("/employee/:id", (req, res) => {
//   res.render("view", {
//     title: `Employee Details for first-name last-name`
//   });
// });

// Start Express server
app.listen(app.get("port"), () => {
  console.log(`Express server is running on ${app.get("port")}`);
});
