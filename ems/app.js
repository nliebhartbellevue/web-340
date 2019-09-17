/**
 * Title: app.js
 * Author: Nathaniel Liebhart
 * Date: September 9th, 2019
 * Description: Express server
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const sanitize = require("mongo-sanitize");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// init Express app
const app = express();

// Mongoose Schemas
const Contact = require("./models/contact");
const User = require("./models/user");

// Connect to mongoDB using .env file
mongoose.connect(process.env.DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// set view engine as ejs
app.set("view engine", "ejs");

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Express session set-up
app.use(
  require("express-session")({
    // this secret is used to encode and decode the session
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Set-up and initilize passport with express
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// Passport methods to work with session data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
// Serve the public directory
app.use(express.static(__dirname + "/public"));

// render the splash/landing screen for the root route
app.get("/", (req, res) => {
  res.render("landing.ejs");
});

// render login/signup pages
app.get("/signup", (req, res) => {
  res.render("login.ejs");
});

// Auth logic
app.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.error(err);
        return res.render("login.ejs");
      }

      passport.authenticate("local")(req, res, () => {
        res.render("login.ejs");
      });
    }
  );
});

// login route
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// auth on login
app.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!user) {
      console.log("Incorrect Username or Password!<br>Please try again.");
      return res.redirect("/login");
    }

    req.logIn(user, err => {
      if (err) {
        console.error(err);
      }

      res.redirect("/" + user._id);
    });
  })(req, res);
});

// dashboard route
app.get("/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      Contact.find({ user: req.params.id }, (err, contactList) => {
        if (err) {
          console.error(err);
        } else {
          contactList = JSON.stringify(contactList);
          res.render("dashboard.ejs", { user, contactList });
        }
      });
    }
  });
});

// add contact route
app.post("/:id/addcontact", (req, res) => {
  // get info from body
  Contact.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.firstName + " " + req.body.lastName,
      company: req.body.company,
      mobilePhone: req.body.mobilePhone,
      workPhone: req.body.workPhone,
      email: req.body.email,
      user: req.params.id
    },
    (err, newContact) => {
      if (err) {
        console.error(err);
      }

      res.send(JSON.stringify(newContact._id));
    }
  );
});

// isLogged In function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

// delete contact route
app.delete("/:id/deletecontact", (req, res) => {
  let contactID = mongoose.Types.ObjectId(req.body.contactID);
  let userID = req.params.id;
  Contact.findByIdAndRemove(contactID, (err0, contact) => {
    if (err0) {
      console.error(err0);
    } else {
      Contact.find({ user: userID }, (err1, contacts) => {
        if (err1) {
          console.error(err1);
        } else {
          res.redirect("/" + userID);
        }
      });
    }
  });
});

// search for contacts route
app.post(":id/searchcontact", (req, res) => {
  let query = sanitize(req.body.query);
  let userID = req.params.id;

  Contact.find(
    { user: userID, fullName: { $regex: query, $options: "i" } },
    (err, contacts) => {
      if (err) {
        console.error(err);
      } else {
        res.send(JSON.stringify(contacts));
      }
    }
  );
});

// logout route
app.get("/:id/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// route to create a new User
app.post("/api/users/new", (req, res) => {
  User.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: req.bodypassword,
      birthday: req.body.date
    },
    (err, new_user) => {
      if (err) {
        console.error(err);
      } else {
        res.send(JSON.stringify(new_user));
      }
    }
  );
});

const PORT = process.env.PORT;
const IP = process.env.IP;

app.listen(PORT, IP, () => {
  console.log(`Express Server is running on ${IP}:${PORT}`);
});
