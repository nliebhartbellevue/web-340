/**
 * Title: users.js
 * Author: Nathaniel Liebhart
 * Date: September 30, 2019
 * Description: This page acts as the routing and business logic for the user routes and model
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Bring in User Model
let User = require("../models/user");

// Register New User Form
router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register for EMS"
  });
});

// Register User Process
router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody("name", "Name is a required field!").notEmpty();
  req.checkBody("email", "Email is a required field!").notEmpty();
  req.checkBody("email", "Email is not valid!").isEmail();
  req.checkBody("username", "Username is a required field!").notEmpty();
  req.checkBody("password", "Password is a required field!").notEmpty();
  req
    .checkBody("password2", "Passwords don't match!")
    .equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors
    });
  } else {
    let newUser = new User({
      name,
      email,
      username,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.error(err);
        }

        newUser.password = hash;
        newUser.save(err => {
          if (err) {
            console.error(err);
            return;
          } else {
            req.flash(
              "success",
              "You are now registered, and ready to log in and start using EMS!"
            );
            res.redirect("/users/login");
          }
        });
      });
    });
  }
});

// Login Form
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login to EMS"
  });
});

// Login Process
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout Process
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You are logged out!");
  res.redirect("/users/login");
});

module.exports = router;
