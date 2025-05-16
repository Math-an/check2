import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  TextareaAutosize,
  Paper,
  Typography,
} from '@mui/material'; // Hypothetical Material UI components
import api from '../api'; // Import the api client

const MessageSend = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    console.log('Sending message to:', recipient);
    console.log('Message:', message);
    try {
      const response = await api.post('/messages', {
        recipient,
        content: message, // Assuming your backend expects 'content' for the message body
      });
      console.log('Message sent successfully:', response.data);
      // Reset form after successful sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setRecipient('');
    setMessage('');
  };

  return (
    <Paper className="p-6 max-w-md mx-auto mt-8 shadow-md">
      <Typography variant="h6" gutterBottom className="text-center mb-4">
        Send New Message
      </Typography>
      <div className="space-y-4">
        <FormControl fullWidth>
          <InputLabel id="recipient-label">Recipient</InputLabel>
          <Select
            labelId="recipient-label"
            id="recipient-select"
            value={recipient}
            label="Recipient"
            onChange={handleRecipientChange}
          >
            {/* Placeholder recipients */}
            <MenuItem value="">
              <em>Select Recipient</em>
            </MenuItem>
            <MenuItem value="parent1">Parent 1</MenuItem>
            <MenuItem value="caretaker1">Caretaker 1</MenuItem>
            {/* Add more recipients dynamically */}
          </Select>
        </FormControl>

        <TextareaAutosize
          minRows={5}
          placeholder="Compose your message..."
          value={message}
          onChange={handleMessageChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Message content"
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSend}>
          Send Message
        </Button>
      </div>
    </Paper>
  );
};

export default MessageSend;