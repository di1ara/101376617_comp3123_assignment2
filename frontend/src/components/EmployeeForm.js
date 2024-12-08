import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

function EmployeeForm({ onSubmit, initialData, resetForm }) {
  const [firstName, setFirstName] = useState(initialData ? initialData.first_name : '');
  const [lastName, setLastName] = useState(initialData ? initialData.last_name : '');
  const [email, setEmail] = useState(initialData ? initialData.email : '');
  const [position, setPosition] = useState(initialData ? initialData.position : '');
  const [salary, setSalary] = useState(initialData ? initialData.salary : '');
  const [dateOfJoining, setDateOfJoining] = useState(initialData ? initialData.date_of_joining : '');
  const [department, setDepartment] = useState(initialData ? initialData.department : '');

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name);
      setLastName(initialData.last_name);
      setEmail(initialData.email);
      setPosition(initialData.position);
      setSalary(initialData.salary);
      setDateOfJoining(initialData.date_of_joining);
      setDepartment(initialData.department);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = {
      first_name: firstName,
      last_name: lastName,
      email,
      position,
      salary,
      date_of_joining: dateOfJoining,
      department,
      _id: initialData ? initialData._id : undefined,
    };

    onSubmit(employee);

    // Reset the form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPosition('');
    setSalary('');
    setDateOfJoining('');
    setDepartment('');

    // Call resetForm to reset success message in the parent component
    if (resetForm) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Date of Joining"
          type="date"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
          required
        />
      </Box>
      <Button type="submit" variant="contained">
        {initialData ? 'Update Employee' : 'Add Employee'}
      </Button>
    </form>
  );
}

export default EmployeeForm;
