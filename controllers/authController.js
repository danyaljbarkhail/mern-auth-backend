// Import necessary modules
const bcrypt = require('bcrypt'); // Module for hashing passwords
const jwt = require('jsonwebtoken'); // Module for generating and verifying JWTs
const User = require('../models/User'); // User model

// Controller for user sign-up
exports.signup = async (req, res) => {
  const { username, email, password } = req.body; // Extract username, email, and password from request body

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' }); // Return error if email is already used
    }

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the provided data
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    res.status(201).json({ message: 'User registered successfully!' }); // Send success response
  } catch (error) {
    res.status(500).json({ message: 'Server error', error }); // Send error response in case of failure
  }
};

// Controller for user sign-in
exports.signin = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' }); // Return error if user is not found
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' }); // Return error if passwords do not match
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Sign-in successful!', token }); // Send success response with JWT token
  } catch (error) {
    res.status(500).json({ message: 'Server error', error }); // Send error response in case of failure
  }
};

// Controller for accessing protected routes
exports.protectedRoute = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the JWT token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' }); // Return error if no token is provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
    res.json({ message: 'Access granted.', user: decoded }); // Send success response if token is valid
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' }); // Return error if token is invalid
  }
};
