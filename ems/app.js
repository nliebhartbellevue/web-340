const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");

// Connect to MongoDB by way of Mongoose
mongoose.connect("mongodb://dbAdmin:Password1@ds139939.mlab.com:39939/ems-db", {
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

// Init Express App
const app = express();

let Employee = require("./models/employee");

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    secret: "a very secret passphrase",
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

// Landing page route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page"
  });
});

// GET: List all Employees
app.get("/employees", (req, res) => {
  res.render("list", {
    title: "Employee List"
  });
});

// POST: Add Ne Employee
app.get("/employees/new", (req, res) => {
  res.render("new", {
    title: "Add New Employee"
  });
});

// GET: View an Employee by id
app.get("/employee/:id", (req, res) => {
  res.render("view", {
    title: `Employee Details for first-name last-name`
  });
});

// Start Express server
app.listen(8080, () => {
  console.log("Express server is running on port 8080!");
});
