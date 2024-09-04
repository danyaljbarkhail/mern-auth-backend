const express = require('express');
const router = express.Router();
const { signup, signin, protectedRoute } = require('../controllers/authController');

// Sign-up route
router.post('/signup', signup);

// Sign-in route
router.post('/signin', signin);

// Protected route
router.get('/protected', protectedRoute);

module.exports = router;
