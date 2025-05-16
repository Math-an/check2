import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, TextField, Button } from '@mui/material'; // Hypothetical Material UI imports
import '../index.css'; // Ensure Tailwind CSS is imported
import api from '../services/api'; // Assuming your API client is in this path

const MessageView = ({ threadId }) => {
  const [messageThread, setMessageThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [replyContent, setReplyContent] = useState('');

  const fetchMessageThread = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/messages/${threadId}`);
      setMessageThread(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching message thread:', err);
      setError('Failed to load message thread.');
      setMessageThread(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (threadId) {
      fetchMessageThread();
    } else {
      setLoading(false);
      setError('No message thread ID provided.');
    }
  }, [threadId]); // Refetch when threadId changes

  const handleReplySubmit = async () => {
    if (!replyContent.trim() || !threadId) {
      return; // Don't send empty replies or if no threadId
    }

    try {
      // Assuming a POST endpoint for replying to a thread
      await api.post(`/messages/${threadId}/reply`, { content: replyContent });
      setReplyContent(''); // Clear the reply input
      fetchMessageThread(); // Refetch the thread to include the new reply
    } catch (err) {
      console.error('Error sending reply:', err);
      // Optionally show an error message to the user
    }
  };

  if (loading) {
    return <Typography variant="h6" className="text-center mt-8">Loading message thread...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" className="text-center mt-8">{error}</Typography>;
  }

  if (!messageThread) {
    return <Typography variant="h6" className="text-center mt-8">Message thread not found.</Typography>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
        <Typography variant="h5" gutterBottom className="mb-4">
          {messageThread.subject}
        </Typography>
        <Divider className="mb-6" />

        <div className="space-y-6">
          {messageThread.messages.map((message) => (
            <div key={message._id} className={`p-4 rounded-lg ${message.sender === 'Caretaker' ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'} max-w-[80%] ${message.sender === 'Caretaker' ? 'mr-auto' : 'ml-auto'}`}>
              <Typography variant="subtitle2" className="font-bold">
                {message.sender} - {message.timestamp}
              </Typography>
              <Typography variant="body1" className="mt-2">
                {message.content}
              </Typography>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="mt-8 p-4 border-t border-gray-300">
          <Typography variant="h6" gutterBottom>Reply</Typography>
          <TextField
            label="Your Reply"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            className="mb-4"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleReplySubmit}>
            Send Reply
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default MessageView;

      setReplyContent('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Paper elevation={3} className="p-6 max-w-3xl mx-auto">
        <Typography variant="h5" gutterBottom className="mb-4">
          {dummyMessageThread.subject}
        </Typography>
        <Divider className="mb-6" />

        <div className="space-y-6">
          {dummyMessageThread.messages.map((message) => (
            <div key={message.id} className={`p-4 rounded-lg ${message.sender.includes("Caretaker") ? 'bg-blue-100 self-start' : 'bg-green-100 self-end'} max-w-[80%] ${message.sender.includes("Caretaker") ? 'mr-auto' : 'ml-auto'}`}>
              <Typography variant="subtitle2" className="font-bold">
                {message.sender} - {message.timestamp}
              </Typography>
              <Typography variant="body1" className="mt-2">
                {message.content}
              </Typography>
            </div>
          ))}
        </div>

        {/* Placeholder for Reply Form */}
        <div className="mt-8 p-4 border-t border-gray-300">
          <Typography variant="h6" gutterBottom>Reply</Typography>
          <TextField
            label="Your Reply"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            className="mb-4"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleReplySubmit}>
            Send Reply
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default MessageView;