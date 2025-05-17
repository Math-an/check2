import React, { useState } from 'react';
// Assume Material UI components are imported like this:
import api from '../api'; // Import the API client

import { TextField, Button, RadioGroup, FormControlLabel, Radio, Typography, Container, Box } from '@mui/material';
// import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

// Placeholder components if Material UI is not actually installed (These were replaced by actual Material UI components)
const Link = ({ to, children }) => <a href={to}>{children}</a>; // Simple anchor tag for demonstration

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('parent'); // 'parent' or 'caretaker'

  const handleSignup = (event) => {
    event.preventDefault();
    api.post('/api/users/register', { email, password, userType })
      .then(response => {
        console.log('Signup successful:', response.data);
        // Handle successful signup (e.g., redirect to login)
      })
      .catch(error => {
        console.error('Signup failed:', error);
        // Handle signup error (e.g., display error message)
      });
  };

  return (
    <Container component="main" maxWidth="sm" className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          backgroundColor: 'white',
          borderRadius: 8,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        className="w-full max-w-md"
      >
        <Typography component="h1" variant="h5" className="text-2xl font-bold mb-6 text-center">
          Sign Up for Child Care System
        </Typography>
        <form onSubmit={handleSignup} className="w-full">
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <RadioGroup aria-label="user type" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} className="my-4 flex justify-center">
            <FormControlLabel value="parent" control={<Radio />} label="Parent" />
            <FormControlLabel value="caretaker" control={<Radio />} label="Caretaker" />
          </RadioGroup>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </Button>
        </form>
        <Link to="/login" className="mt-4 text-blue-500 hover:underline">Already have an account? Log In</Link>
      </Box>
    </Container>
  );
};

export default Signup;
