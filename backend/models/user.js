// backend/models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hashing the password before saving
  }
  next();
});

// Compare the password when logging in
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Comparing hashed password
};

module.exports = mongoose.model('User', userSchema);
