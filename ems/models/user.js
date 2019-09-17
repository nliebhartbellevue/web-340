const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: { type: String, default: "Last Name" },
  email: String,
  username: String,
  password: String,
  birthdate: Date,
  createdAt: { type: Date, default: Date.now() }
});

// Connect the userSchema to passport local mongoose
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
