// backend/routes/employeeRoutes.js (example)
const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// Handle GET request to fetch employees
router.get('/', getEmployees); // This matches your `getEmployees()` method in the service

// Handle POST request to add new employee
router.post('/', addEmployee); // This matches your `addEmployee()` method in the service

// Handle PUT request to update an employee
router.put('/:id', updateEmployee); // This matches your `updateEmployee(id, employee)` method

// Handle DELETE request to remove an employee
router.delete('/:id', deleteEmployee); // This matches your `deleteEmployee(id)` method

module.exports = router;
