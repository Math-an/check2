import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Chip } from '@mui/material';
import moment from 'moment'; // Assuming you have moment.js installed for date formatting
import api from '../api'; // Import the API client

const ViewChild = ({ childId }) => {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChild = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/children/${childId}`);
        setChild(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (childId) {
      fetchChild();
    }
  }, [childId]);

  if (loading) return <Typography variant="h6" className="text-center mt-8">Loading child data...</Typography>;
  if (error) return <Typography variant="h6" className="text-center mt-8 text-red-500">Error loading child data: {error.message}</Typography>;
  if (!child) {
    return <Typography variant="h6" className="text-center mt-8">No child data available.</Typography>;
  }

  return (
    <Card className="m-4 shadow-lg rounded-lg">
      <CardHeader
        title={
          <Typography variant="h5" className="text-blue-600 font-bold">
            {child.name}
          </Typography>
        }
        subheader={
          <Typography variant="subtitle2" className="text-gray-500">
            Date of Birth: {child.dateOfBirth ? moment(child.dateOfBirth).format('MM/DD/YYYY') : 'N/A'}
          </Typography>
        }
        className="bg-blue-50 p-4"
      />
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <Typography variant="body1" className="font-semibold mr-2">Gender:</Typography>
          <Chip label={child.gender || 'N/A'} color={child.gender === 'Male' ? 'primary' : child.gender === 'Female' ? 'secondary' : 'default'} size="small" />
        </div>
        <div>
          <Typography variant="body1" className="font-semibold mb-1">Notes/Medical Information:</Typography>
          <Typography variant="body2" className="text-gray-700">{child.notes || 'No notes available.'}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewChild;