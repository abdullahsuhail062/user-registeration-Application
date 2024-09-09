// api/register.js

const express = require('express');
const { body, validationResult } = require('express-validator');

// Create the Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Registration route with validation
app.post(
  '/api/register',
  [
    // Username must be at least 3 characters long
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    
    // Email must be a valid email format
    body('email').isEmail().withMessage('Please provide a valid email address'),
    
    // Password must be at least 6 characters long
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, extract user data
    const { username, email, password } = req.body;

    // TODO: Save user data to the database (e.g., MongoDB)
    
    // Example response
    res.status(200).json({ message: 'User registered successfully', username, email });
  }
);



module.exports = app;
