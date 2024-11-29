import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
} from '@mui/material';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on each submit
    setSuccessMessage(''); // Reset success message
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', { email, password });

      if (response.status === 200) {
        setSuccessMessage('Account created successfully! Please log in.');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after a delay
        }, 2000);
      }
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: '1rem' }}>
          {successMessage}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSignup}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
