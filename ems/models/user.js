/**
 * Title: user.js
 * Author: Nathaniel Liebhart
 * Date September 30, 2019
 * Description: This is the model and mongoose schema for a User record
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("User", UserSchema);
