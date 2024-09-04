// Import mongoose to define a schema
const mongoose = require('mongoose');

// Define the schema for User model
const userSchema = new mongoose.Schema({
  username: {
    type: String, // The username field is a string
    required: true, // This field is required
  },
  email: {
    type: String, // The email field is a string
    required: true, // This field is required
    unique: true,  // Ensure unique indexing on the email field to prevent duplicate accounts
  },
  password: {
    type: String, // The password field is a string
    required: true, // This field is required
  },
});

// Create a Mongoose model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
