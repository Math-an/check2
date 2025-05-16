import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Rethrow the error to be handled by the calling component
  }
};

export const getChildren = () => handleRequest(() => api.get('/children'));
export const getEvents = () => handleRequest(() => api.get('/events'));
export const getMessages = () => handleRequest(() => api.get('/messages'));
export const getPhotos = () => handleRequest(() => api.get('/photos'));
export const getUsers = () => handleRequest(() => api.get('/users'));

export const createChild = (childData) => handleRequest(() => api.post('/children', childData));
export const createEvent = (eventData) => handleRequest(() => api.post('/events', eventData));
export const createMessage = (messageData) => handleRequest(() => api.post('/messages', messageData));
export const createPhoto = (photoData) => handleRequest(() => api.post('/photos', photoData));
export const createUser = (userData) => handleRequest(() => api.post('/users', userData));

export const updateChild = (id, childData) => handleRequest(() => api.put(`/children/${id}`, childData));
export const updateEvent = (id, eventData) => handleRequest(() => api.put(`/events/${id}`, eventData));
export const updateMessage = (id, messageData) => handleRequest(() => api.put(`/messages/${id}`, messageData));
export const updatePhoto = (id, photoData) => handleRequest(() => api.put(`/photos/${id}`, photoData));
export const updateUser = (id, userData) => handleRequest(() => api.put(`/users/${id}`, userData));

export const deleteChild = (id) => handleRequest(() => api.delete(`/children/${id}`));
export const deleteEvent = (id) => handleRequest(() => api.delete(`/events/${id}`));
export const deleteMessage = (id) => handleRequest(() => api.delete(`/messages/${id}`));
export const deletePhoto = (id) => handleRequest(() => api.delete(`/photos/${id}`));
export const deleteUser = (id) => handleRequest(() => api.delete(`/users/${id}`));