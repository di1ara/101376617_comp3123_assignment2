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
  email: { 
    type: String,
    required: true,  // You can make it required or optional, depending on your requirements
    unique: true,    // Ensure no two employees have the same email
  },

});

module.exports = mongoose.model('Employee', employeeSchema);
