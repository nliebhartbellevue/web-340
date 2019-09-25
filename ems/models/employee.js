const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Employee Schema
const EmployeeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
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

module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
