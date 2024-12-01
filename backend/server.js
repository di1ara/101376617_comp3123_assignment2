// backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Database connection error: ", err));

// Routes
app.use('/api/auth',authRoutes);  // Authentication routes (login/signup)
app.use('/api/employees', employeeRoutes);  // Employee management routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
