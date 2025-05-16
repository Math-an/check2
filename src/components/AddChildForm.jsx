import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize, // Assuming TextareaAutosize for the notes field
  Typography,
  Box, // For layout using Box component
} from '@mui/material'; // Hypothetical Material UI import
import { styled } from '@mui/system'; // For potential custom styling within MUI
import api from '../api'; // Import the api client

// Styled TextareaAutosize if needed for specific MUI overrides or just use Tailwind
const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc; // Basic border, can be overridden by Tailwind
  &:focus {
    outline: 0;
    border-color: ${theme.palette.primary.main};
  }
`,
);


const AddChildForm = () => {
  const [childData, setChildData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChildData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();    // Handle form submission logic here
    api.post('/children', childData)
      .then(response => {
        console.log('Child added successfully:', response.data);
        // TODO: Add success message or redirect
      })
      .catch(error => {
        console.error('Error adding child:', error);
      });
    console.log('Child Data Submitted:', childData);
  };

  return (
    <Box className="container mx-auto p-4 max-w-md">
      <Typography variant="h5" component="h2" gutterBottom className="text-center mb-6">
        Add New Child
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Child's Name"
          name="name"
          value={childData.name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={childData.dateOfBirth}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <FormControl fullWidth required variant="outlined">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            name="gender"
            value={childData.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="">
              <em>Select Gender</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined">
           {/* Using StyledTextarea or just applying Tailwind classes directly */}
          <label htmlFor="notes" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes/Medical Information</label>
           <StyledTextarea
            id="notes"
            name="notes"
            minRows={3}
            placeholder="Enter any notes or medical information"
            value={childData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" // Tailwind classes for textarea
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-2" // Tailwind class for top margin
        >
          Add Child
        </Button>
      </form>
    </Box>
  );
};

export default AddChildForm;