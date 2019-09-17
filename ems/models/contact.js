const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: { type: String, default: "Last Name" },
  fullName: String,
  mobileName: String,
  workPhone: String,
  company: String,
  email: String,
  // User model to act as the forign key
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Contact", contactSchema);
