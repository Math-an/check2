import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './server/routes/users.js';
import childRoutes from './server/routes/children.js';
import eventRoutes from './server/routes/events.js';
import photoRoutes from './server/routes/photos.js';
import messageRoutes from './server/routes/messages.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/children', childRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/messages', messageRoutes);

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to start server after database connection:', err);
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});