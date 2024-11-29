// backend/models/employee.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  // Other employee-related fields can go here
});

module.exports = mongoose.model('Employee', employeeSchema);
