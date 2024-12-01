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
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
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
      const response = await axios.put(`http://localhost:5000/api/employees/${employee._id}`, {
        name: employee.name,
        position: employee.position,
        email: employee.email, // Include email in the update
      });

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
        label="Search by Name, Position, or Email"
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Position</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(employee)}
                          color="primary"
                          style={{ marginRight: '10px' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(employee._id)}
                          color="secondary"
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => handleViewDetails(employee)}
                          color="default"
                          style={{ marginLeft: '10px' }}
                        >
                          <Visibility />
                        </IconButton>
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

      {/* Employee Details Dialog */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Box>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {selectedEmployee.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Position:</strong> {selectedEmployee.position}
              </Typography>
              <Typography variant="body1" color="textSecondary" style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> {selectedEmployee.email}
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
