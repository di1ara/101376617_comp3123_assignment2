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
  Link,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/employees'); // Redirect to employee list after successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleLogin}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </Box>

      {/* Sign Up Prompt */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link href="/signup" variant="body2" color="primary">
            Sign Up here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
