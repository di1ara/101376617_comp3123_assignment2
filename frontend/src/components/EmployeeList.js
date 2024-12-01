import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import { TextField, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box } from '@mui/material';
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
            <Box>
              {filteredEmployees.map((employee) => (
                <Box key={employee._id} display="flex" justifyContent="space-between" alignItems="center" padding="10px" borderBottom="1px solid #ccc">
                  <Box>
                    <Typography variant="h6">{employee.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{employee.position}</Typography>
                    <Typography variant="body2" color="textSecondary">{employee.email}</Typography> {/* Display email */}
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(employee)}
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleViewDetails(employee)}
                      style={{ marginLeft: '10px' }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
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
              <Typography variant="h6">{selectedEmployee.name}</Typography>
              <Typography variant="body1">Position: {selectedEmployee.position}</Typography>
              <Typography variant="body1">Email: {selectedEmployee.email}</Typography> {/* Display email */}
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
