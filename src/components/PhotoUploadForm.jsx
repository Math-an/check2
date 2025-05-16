import React, { useState } from 'react';
import {
  Button,
  TextareaAutosize,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from '@mui/material'; // Assuming Material UI v5 or later
import { styled } from '@mui/system'; // Or styled from @mui/material/styles

// Example Styled components if needed for specific overrides or complex styling
// const StyledForm = styled('form')({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1rem', // Example gap
// });

const PhotoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedChild, setSelectedChild] = useState('');

  // Hypothetical list of children for the dropdown
  const children = [
    { id: 1, name: 'Child A' },
    { id: 2, name: 'Child B' },
    { id: 3, name: 'Child C' },
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., upload photo, send data)
    console.log('Submitting photo:', selectedFile);
    console.log('Description:', description);
    console.log('Selected Child:', selectedChild);
    // Reset form after submission
    setSelectedFile(null);
    setDescription('');
    setSelectedChild('');
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h6" component="h2" className="mb-4 text-xl font-semibold">
        Send Child Activity Photo
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Child Selection */}
        <FormControl fullWidth>
          <InputLabel id="child-select-label">Select Child</InputLabel>
          <Select
            labelId="child-select-label"
            id="child-select"
            value={selectedChild}
            label="Select Child"
            onChange={handleChildChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {children.map((child) => (
              <MenuItem key={child.id} value={child.id}>
                {child.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Photo Upload Input */}
        <div>
          <InputLabel htmlFor="photo-upload-button">Upload Photo</InputLabel>
          <Input
            id="photo-upload-button"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {selectedFile && (
            <Typography variant="body2" className="mt-2">
              Selected File: {selectedFile.name}
            </Typography>
          )}
        </div>

        {/* Description Textarea */}
        <div>
          <FormLabel>Description</FormLabel>
          <TextareaAutosize
            aria-label="activity description"
            minRows={3}
            placeholder="Describe the child's activity..."
            value={description}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4 self-end" // Tailwind class for alignment
          disabled={!selectedFile || !selectedChild}
        >
          Send Photo
        </Button>
      </form>
    </div>
  );
};

export default PhotoUploadForm;