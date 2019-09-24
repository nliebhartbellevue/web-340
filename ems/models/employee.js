let mongoose = require("mongoose");

// Employee Schema
let employeeSchema = mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    default: "Last Name"
  },
  phone: {
    type: Array
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

let Employee = (module.exports = mongoose.model("Employee", employeeSchema));
