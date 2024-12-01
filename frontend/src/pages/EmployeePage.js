import React, { useEffect, useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import employeeService from '../services/employeeService';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
} from '@mui/material';

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the employees on page load
  useEffect(() => {
    async function fetchEmployees() {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  // Handle adding or updating an employee
  const handleAddOrUpdate = async (employee) => {
    try {
      if (editingEmployee) {
        // Update the employee on the server
        await employeeService.updateEmployee(editingEmployee.id, employee);
  
        // Optimistically update the employee in the state
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.id === editingEmployee.id ? { ...emp, ...employee } : emp
          )
        );
        setSuccessMessage('Employee updated successfully!');
      } else {
        // Add the new employee to the server
        const newEmployee = await employeeService.addEmployee(employee);
  
        // Optimistically add the new employee to the state
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
        setSuccessMessage('Employee added successfully!');
      }
  
      // Clear the editing state
      setEditingEmployee(null);
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error adding or updating employee", error);
    }
  };
  
  

  // Handle deleting an employee
  const handleDelete = async (id) => {
    try {
      await employeeService.deleteEmployee(id);
      // Remove the employee from the local state
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Management
        </Typography>
        <Divider sx={{ marginBottom: '2rem' }} />
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </Typography>
          <EmployeeForm
            onSubmit={handleAddOrUpdate}
            initialData={editingEmployee}
          />
        </Box>
        <Divider sx={{ marginY: '2rem' }} />
        
        {/* Display Success Message */}
        {successMessage && <Typography color="success.main" align="center">{successMessage}</Typography>}
        
        <Typography variant="h6" gutterBottom>
          Employee List
        </Typography>
        <EmployeeList
          employees={employees}
          onDelete={handleDelete}
          onEdit={setEditingEmployee} // Allow editing functionality
        />
      </Paper>
    </Container>
  );
}

export default EmployeePage;
