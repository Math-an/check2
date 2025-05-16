import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material'; // Hypothetical Material UI imports
import api from '../api'; // Import the api client

const MessageInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Paper className="p-4 shadow-md rounded-md">
      <Typography variant="h6" className="mb-4">Message Inbox</Typography>
      <List>
        {loading ? (
          <Typography variant="body1" className="text-center text-gray-500">Loading messages...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error" className="text-center">Error loading messages: {error.message}</Typography>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <ListItem key={message._id} button divider className="hover:bg-gray-100"> {/* Assuming _id from MongoDB */}
              <ListItemText
                primary={
                  <Typography variant="subtitle1" className="font-semibold">
                    {message.sender} {/* Assuming message object has a sender field */}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textPrimary" className="truncate">
                      {message.subject} {/* Assuming message object has a subject field */}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="text-sm">
                      {message.preview} {/* Assuming message object has a preview field or you'll generate one */}
                    </Typography>
                  </>
                }
              />
              {/* Placeholder for click action to view full message/thread */}
              {/* In a real app, this ListItem would likely be a Link or have an onClick handler */}
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" className="text-center text-gray-500">
            No messages in your inbox.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default MessageInbox;