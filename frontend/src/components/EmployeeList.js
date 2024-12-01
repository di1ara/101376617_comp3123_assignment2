import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; // Import your EmployeeForm component
import { TextField, CircularProgress } from '@mui/material'; // Material-UI components for UI
import debounce from 'lodash.debounce'; // Import debounce from lodash

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // For editing a specific employee
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filteredEmployees with all employees
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
        employee.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filteredList);
  }, [searchQuery, employees]);

  // Debounced search function
  const handleSearchChange = debounce((event) => {
    setSearchQuery(event.target.value);
  }, 300); // 300ms debounce delay

  // Function to highlight search query in text
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : part
    );
  };

  // Handle delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id)); // Remove deleted employee from state
      setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id)); // Remove from filtered list as well
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  // Handle edit employee
  const handleEdit = (employee) => {
    setEmployeeToEdit(employee); // Set the employee to edit
  };

  // Handle the submission of the form (Update)
  const handleUpdateEmployee = async (employee) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${employee._id}`, {
        name: employee.name,
        position: employee.position,
      });

      // Update employee in the state after editing
      const updatedEmployee = response.data;
      setEmployees(employees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp)));
      setFilteredEmployees(filteredEmployees.map(emp => (emp._id === updatedEmployee._id ? updatedEmployee : emp))); // Update filtered list
      setEmployeeToEdit(null); // Clear the edit form after successful update
    } catch (err) {
      console.error('Error updating employee', err);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Search Input */}
      <TextField
        label="Search by Name or Position"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange} // Use debounced search
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
            <p>No results found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{highlightText(employee.name, searchQuery)}</td>
                    <td>{highlightText(employee.position, searchQuery)}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>Edit</button>
                      <button onClick={() => handleDelete(employee._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {employeeToEdit && (
        <EmployeeForm
          initialData={employeeToEdit} // Pass the selected employee to the form
          onSubmit={handleUpdateEmployee} // Pass the handleUpdateEmployee function to the form
        />
      )}
    </div>
  );
};

export default EmployeeList;
