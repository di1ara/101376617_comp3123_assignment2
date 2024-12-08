import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import { TextField, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material'; // Importing icons
import debounce from 'lodash.debounce';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filteredList = employees.filter(
      (employee) =>
        `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filteredList);
  }, [searchQuery, employees]);

  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 300);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
      setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
  };

  const handleUpdateEmployee = async (employee) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${employee._id}`, employee);
      const updatedEmployee = response.data;
      setEmployees(employees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
      setFilteredEmployees(filteredEmployees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
      setEmployeeToEdit(null);
    } catch (err) {
      console.error('Error updating employee', err);
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <TextField
        label="Search by Name, Position, Email, or Department"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        margin="normal"
        style={{ marginBottom: '20px' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {filteredEmployees.length === 0 ? (
            <Typography variant="h6" color="textSecondary">No results found</Typography>
          ) : (
            <TableContainer component={Paper} style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>First Name</strong></TableCell>
                    <TableCell><strong>Last Name</strong></TableCell>
                    <TableCell><strong>Position</strong></TableCell>
                    <TableCell><strong>Department</strong></TableCell>
                    <TableCell><strong>Salary</strong></TableCell>
                    <TableCell><strong>Date of Joining</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.first_name}</TableCell>
                      <TableCell>{employee.last_name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.salary}</TableCell>
                      <TableCell>{new Date(employee.date_of_joining).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center" alignItems="center">
                          <IconButton
                            onClick={() => handleEdit(employee)}
                            color="primary"
                            style={{ marginRight: '10px', fontSize: '20px' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(employee._id)}
                            color="secondary"
                            style={{ marginRight: '10px', fontSize: '20px' }}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                            onClick={() => handleViewDetails(employee)}
                            color="default"
                            style={{ fontSize: '20px' }}
                          >
                            <Visibility />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {employeeToEdit && (
        <EmployeeForm
          initialData={employeeToEdit}
          onSubmit={handleUpdateEmployee}
        />
      )}

      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {selectedEmployee.first_name} {selectedEmployee.last_name}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Position:</strong> {selectedEmployee.position}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {selectedEmployee.email}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Department:</strong> {selectedEmployee.department}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Salary:</strong> {selectedEmployee.salary}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Date of Joining:</strong> {new Date(selectedEmployee.date_of_joining).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
