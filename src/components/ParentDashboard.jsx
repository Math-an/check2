import React, { useEffect, useState } from 'react';
import AddChildForm from './AddChildForm';
import ViewChild from './ViewChild';
import ParentEventCalendar from '../pages/ParentEventCalendar';
import PhotoGallery from './PhotoGallery';
import MessageInbox from './MessageInbox';
import MessageSend from './MessageSend';

// Hypothetical Material UI Imports (replace with actual imports if using Material UI)
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import api from '../api'; // Import the api client

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [messages, setMessages] = useState([]);
  // Events are fetched within ParentEventCalendar, so no need to fetch here

  useEffect(() => {
    // Fetch Children
    api.get('/api/children')
      .then(response => {
        setChildren(response.data);
      })
      .catch(error => {
        console.error('Error fetching children:', error);
        // Handle error (e.g., show error message)
      });

    // Fetch Photos
    api.get('/api/photos') // Assuming /api/photos returns photos relevant to the parent
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        // Handle error
      });

    // Fetch Messages
    api.get('/api/messages') // Assuming /api/messages returns messages relevant to the parent
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        // Handle error
      });
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" gutterBottom className="mb-6">
        Parent Dashboard
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Child Management Card */}
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h5" component="div" className="mb-4">
              Child Management
            </Typography>
            <AddChildForm />
            <div className="mt-6">
              <Typography variant="h6" className="mb-2">
                Existing Children:
              </Typography>
              {/* Placeholder for ViewChild - In a real app, you would map over child data */}
              {children.map(child => (
                <div key={child.id} className="border-b border-gray-200 pb-4 mb-4">
                  <ViewChild child={child} />
                </div>
              ))}
              {/* Button or link to view all children if needed */}
              {/* <button className="text-blue-600 hover:underline mt-2">View All Children</button> */}
            </div>
          </CardContent>
        </Card>

        {/* Event Calendar Card */}
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h5" component="div" className="mb-4">
              Event Calendar
            </Typography>
            {/* Pass dummy or fetched event data to ParentEventCalendar */}
            <ParentEventCalendar /> {/* ParentEventCalendar fetches its own events */}
          </CardContent>
        </Card>

        {/* Photo Gallery Card */}
        <Card className="shadow-lg rounded-lg col-span-1 md:col-span-2">
          {/* Make this card span two columns on medium screens and above */}
          <CardContent>
            <Typography variant="h5" component="div" className="mb-4">
              Photo Gallery
            </Typography>
            {/* Pass dummy or fetched photo data to PhotoGallery */}
            <PhotoGallery photos={photos} /> {/* Pass actual photos here */}
          </CardContent>
        </Card>

        {/* Messaging Card */}
        <Card className="shadow-lg rounded-lg col-span-1 md:col-span-2">
          {/* Make this card span two columns on medium screens and above */}
          <CardContent>
            <Typography variant="h5" component="div" className="mb-4">
              Messaging
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Message Inbox */}
              <div>
                <Typography variant="h6" className="mb-2">
                  Inbox
                </Typography>
                {/* Pass dummy or fetched message data to MessageInbox */}
                <MessageInbox messages={messages} /> {/* Pass actual messages here */}
              </div>
              {/* Compose Message */}
              <div>
                <Typography variant="h6" className="mb-2">
                  Compose Message
                </Typography>
                <MessageSend />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;