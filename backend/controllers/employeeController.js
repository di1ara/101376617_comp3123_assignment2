// backend/controllers/employeeController.js

const Employee = require('../models/employee');

// Function to get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Assuming you are using MongoDB with Mongoose
    res.json(employees); // Return the employee data
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Function to add a new employee
const addEmployee = async (req, res) => {
  const { name, position } = req.body; // Example fields
  try {
    const newEmployee = new Employee({ name, position });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error adding employee' });
  }
};

// Function to update an existing employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position } = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, { name, position }, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee' });
  }
};

// Function to delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(204).send(); // No content response
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };
