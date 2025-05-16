import React, { useState, useEffect } from 'react';
import api from '../api'; // Assuming your api client is in '../api'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material'; // Replace with actual Material UI import if used

const PhotoGallery = ({ photos }) => {
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        // Adjust the endpoint if you need to filter photos by child or other criteria
        const response = await api.get('/api/photos');
        setPhotoList(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to fetch photos.');
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Child Activity Photos</h2>
      {loading && <Typography>Loading photos...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Grid container spacing={4}>
          {photoList.map((photo) => (
            // Assuming each photo object has a unique _id from the backend
            <Grid item key={photo._id} xs={12} sm={6} md={4}>
            <Card className="h-full flex flex-col">
              <CardMedia
                component="img"
                height="140"
                image={photo.url}
                alt={`Activity photo ${index + 1}`}
                className="object-cover w-full"
              />
              <CardContent className="flex-grow">
                <Typography variant="body2" color="text.secondary">
                  {photo.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
      )}
       {!loading && !error && photoList.length === 0 && (
          <Typography variant="h6" className="text-center text-gray-500">
            No photos available yet.
          </Typography>
      )}
    </div>
  );
};

export default PhotoGallery;