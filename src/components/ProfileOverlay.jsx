import React from 'react';
import { Button, Divider, List, ListItem, Typography } from '@mui/material'; // Hypothetical Material UI Imports
import classNames from 'classnames';

import api from '../api'; // Assuming your api client is in '../api'
const ProfileOverlay = ({ isOpen, onClose }) => {
  const overlayClasses = classNames(
    'fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center',
    {
      'hidden': !isOpen,
      'block': isOpen,
    }
  );

  const contentClasses = classNames(
    'bg-white p-6 rounded-lg shadow-xl w-full max-w-sm',
    'dark:bg-gray-800' // Example of Tailwind dark mode
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" component="h2" className="text-center mb-4">
          Profile
        </Typography>
        <Divider className="mb-4" />
        <List>
          <ListItem button>
            <Typography>View Profile</Typography>
          </ListItem>
          <ListItem button>
            <Typography>Settings</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className="mt-4"
              onClick={async () => {
                // Handle Logout Logic Here
                console.log('Logout clicked');
                try {
                  await api.post('/api/auth/logout'); // Assuming your logout endpoint is '/api/auth/logout'
                  console.log('Logout successful');
                } catch (error) {
                  console.error('Logout failed:', error);
                } finally {
                  onClose(); // Close overlay after action
              }}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default ProfileOverlay;