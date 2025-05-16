import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material'; // Material UI components
import '../index.css'; // Import Tailwind CSS
import api from '../api'; // Import the api client

const ParentEventCalendar = () => {
  // In a real application, you would use a calendar library here
  // and pass the 'events' data to it.

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" gutterBottom className="text-center text-gray-800 mb-6">
      </Typography>
      <Paper className="p-6 shadow-md">
        <Typography variant="h6" className="text-gray-700 mb-4">
          Upcoming Events
        </Typography>
        <div className="border border-gray-300 p-4 rounded-md h-96 flex items-center justify-center text-gray-500">
          {/* Placeholder for a Calendar Component */}
          <p>Calendar component goes here.</p>
          {/* In a real app, you would loop through 'events' and display them on the calendar */}
        </div>

        {events.length > 0 && (
          <div className="mt-6">
            <Typography variant="h6" className="text-gray-700 mb-3">
              Event Details (Placeholder)
            </Typography>
            {events.map((event, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <Typography variant="body1" className="font-semibold">{event.title}</Typography>
                <Typography variant="body2">{event.date} - {event.time}</Typography>
                <Typography variant="body2" className="text-gray-600">{event.description}</Typography>
              </div>
            ))}
          </div>
        )}
         {events.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            <Typography variant="body1">No upcoming events.</Typography>
          </div>
         )}
      </Paper>
    </div>
  );
};

export default ParentEventCalendar;