// Import necessary modules
const express = require('express'); // Framework for building web apps with Node.js
const mongoose = require('mongoose'); // Object Data Modeling (ODM) library for MongoDB and Node.js
const dotenv = require('dotenv'); // Module to load environment variables from a .env file

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Set the server port, default to 5000 if not specified in .env

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Check and log the MongoDB URI to ensure it's loaded correctly
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Use the new MongoDB URL parser
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
})
.then(() => console.log('MongoDB connected...')) // Log successful connection
.catch(err => console.error('MongoDB connection error:', err)); // Log any connection errors

// Import routes
const authRoutes = require('./routes/auth'); // Authentication routes

// Use authentication routes under the '/api' path
app.use('/api', authRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log that the server is running
});
