import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, useMediaQuery, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Import icons for Dark/Light Mode
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeePage from './pages/EmployeePage';

function App() {
  // Detect system theme preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // State for dark mode toggle (optional, if you want manual control)
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  // Create the theme based on user preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',  // Switch between light and dark modes
      primary: {
        main: '#1976d2', // Example primary color (customizable)
      },
      secondary: {
        main: '#d32f2f', // Example secondary color (customizable)
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6f8', // Background color
        paper: darkMode ? '#1d1d1d' : '#ffffff', // Paper color
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000', // Primary text color
        secondary: darkMode ? '#b0bec5' : '#757575', // Secondary text color
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* This will apply the global styles (dark or light) */}
      
      {/* Add AppBar and Toggle Button */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Employment Management System
          </Typography>
          
          {/* Dark Mode Toggle Button with Icon */}
          <IconButton 
            edge="end"
            color="inherit" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label="toggle dark mode"
            sx={{ borderRadius: '50%' }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />} {/* Show sun or moon icon based on dark mode */}
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
