// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Set the server port, default to 5000 if not specified in .env

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Log the MongoDB URI to ensure it's loaded correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');

// Use authentication routes under the '/api' path
app.use('/api', authRoutes);

// Define root route to handle requests to the base URL
app.get('/', (req, res) => {
  res.send('Welcome to the MERN Auth API!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the app for use in serverless environments like Vercel
module.exports = app;
