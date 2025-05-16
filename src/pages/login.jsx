import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

// Hypothetical Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import api from '../api'; // Import the api client

function LoginPage() {
  const [loginType, setLoginType] = useState('Parent'); // 'Parent' or 'Caretaker'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here based on loginType, username, and password
    api.post('/users/login', { username, password })
      .then(response => {
        console.log('Login successful:', response.data);
        // Handle successful login (e.g., store token, redirect)
      })
      .catch(error => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message)
      });
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <Typography variant="h5" component="h2" className="text-center text-gray-900 font-extrabold">
          Child Care System Login
        </Typography>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <FormControl component="fieldset" className="w-full flex justify-center">
            <FormLabel component="legend" className="text-center mb-4">Login Type</FormLabel>
            <RadioGroup
              row
              aria-label="login type"
              name="row-radio-buttons-group"
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="justify-center"
            >
              <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
              <FormControlLabel value="Caretaker" control={<Radio />} label="Caretaker" />
            </RadioGroup>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username/Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit" // Changed to submit
            fullWidth
            variant="contained"
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" // Example Tailwind class
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/signup" className="text-sm text-blue-600 hover:text-blue-500">
            Don't have an account? Sign up here
          </Link>
        </div>
    </div>
    </div>
  );
}

export default LoginPage;