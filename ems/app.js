/**
 * Title: app.js
 * Author: Nathaniel Liebhart
 * Date: September 24, 2019
 * Description: Server file for ems application
 */
// Require statements
const express = require("express");
const http = require("http");
const path = require("path");
const logger = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const mongoose = require("mongoose");
const config = require("./config/database");
const Employee = require("./models/employee");

/**
 * Connect to mLab using config file
 */
const mongoDB = config.database;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("EMS Server connected to mLab");
});

// Set-up CSRF protection
let csrfProtection = csrf({ cookie: true });

// Init Express App
const app = express();

/**
 * Configure middleware and dependency libraries
 */

// Morgan logger
app.use(logger("short"));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Helmet
app.use(helmet.xssFilter());

// CSRF protection
app.use(csrfProtection);

// Set assets path and use for static files
let assets = path.resolve(__dirname, "assets");
app.use("/assets", express.static(assets));

/**
 * Set up CSRF protection to intercept all incoming request
 * and add a CSRF token to the response
 */
app.use((req, res, next) => {
  let token = req.csrfToken();
  res.cookie("XSRF-TOKEN", token);
  res.locals.csrfToken = token;
  next();
});

/**
 * Set up view engine
 * view's directory path
 * and server port
 */
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);

/**
 * Description: Redirects users to Home page
 * Type: GET
 * Request: n/a
 * Response: index.ejs, Employee[]
 * URL: localhost:8080
 */
app.get("/", (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(employees);
      res.render("index", {
        title: "EMS | Home",
        employees
      });
    }
  });
});

// Route files
let routes = require("./routes/employees");
app.use(routes);

// Start Express server
app.listen(app.get("port"), () => {
  console.log(`Express server is running on ${app.get("port")}`);
});
