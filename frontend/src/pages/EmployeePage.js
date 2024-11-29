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

  useEffect(() => {
    async function fetchEmployees() {
      const data = await employeeService.getEmployees();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (employee) => {
    if (editingEmployee) {
      await employeeService.updateEmployee(editingEmployee.id, employee);
    } else {
      await employeeService.addEmployee(employee);
    }
    const updatedEmployees = await employeeService.getEmployees();
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
  };

  const handleDelete = async (id) => {
    await employeeService.deleteEmployee(id);
    const updatedEmployees = await employeeService.getEmployees();
    setEmployees(updatedEmployees);
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
