import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

function EmployeeForm({ onSubmit, initialData, resetForm }) {
  const [name, setName] = useState(initialData ? initialData.name : '');
  const [position, setPosition] = useState(initialData ? initialData.position : '');
  const [email, setEmail] = useState(initialData ? initialData.email : ''); // Add email state

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPosition(initialData.position);
      setEmail(initialData.email); // Set email if editing an existing employee
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const employee = { name, position, email, _id: initialData ? initialData._id : undefined }; // Include email in the employee object
    onSubmit(employee); // Call onSubmit with the employee data

    // Reset the form fields
    setName('');
    setPosition('');
    setEmail(''); // Reset email field

    // Call resetForm to reset success message in the parent component
    if (resetForm) {
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginBottom: '1rem' }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Handle email change
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
