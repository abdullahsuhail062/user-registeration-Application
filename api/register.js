// // api/register.js

// const express = require('express');
// const { body, validationResult } = require('express-validator');

// // Create the Express app
// const app = express();

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Registration route with validation
// app.post(
//   '/api/register',
//   [
//     // Username must be at least 3 characters long
//    // body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
//    body('username')
//    .trim() // Removes extra whitespace from both sides of the string
//    .notEmpty().withMessage('Please provide the username').bail() // Ensure the username is not empty
//    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'), // Ensure username is at least 3 characters long
//     // Email must be a valid email format
//     body('email').isEmail().withMessage('Please provide a valid email address'),
    
//     // Password must be at least 6 characters long
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   ],
//   (req, res) => {
//     // Handle validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // If validation passes, extract user data
//     const { username, email, password } = req.body;

//     // TODO: Save user data to the database (e.g., MongoDB)
    
//     // Example response
//     res.status(200).json({ message: 'User registered successfully', username, email });
//   }
// );



// module.exports = app;


const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST route to validate username, email, and password
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const errors = {};

  // 1. Validate Username
  if (!username || username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }

  const emailRegex =  /^[a-zA-Z0-9._%+-]+@example\.com$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Invalid email address';
  }
  

  // 3. Validate Password
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  // Check if there are validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If all validations pass
  return res.status(200).json({ message: 'All fields are valid' });
});

module.exports = app;

// Start the server
