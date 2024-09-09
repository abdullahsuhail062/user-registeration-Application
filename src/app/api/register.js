// const express = require('express');
// const cors = require('cors'); // Import CORS middleware
// const { body, validationResult } = require('express-validator');
// // app.use(cors({
// //     origin:'https://user-registeration-application-git-main-suhailumars-projects.vercel.app/api/register', // Replace with your frontend URL
// //   }));

// const app = express();

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Registration route with validation
// app.post(
//   '/api/register',
//   [
//     // Username must be at least 3 characters long
//     body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    
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

//     // If validation passes, proceed with registration logic
//     const { username, email, password } = req.body;

//     // Example response (you should handle your user registration logic here)
//     res.status(200).json({ message: 'User registered successfully', username, email });
//   }
// );

// module.exports = app



const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// User registration endpoint
app.post('https:/api/register', (req, res) => {
  const {username, email, password } = req.body;

  // Add logic to save user to the database (e.g., MongoDB, MySQL)
  // For now, just return a success response
  if (username&&email && password) {
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ error: 'Email and password are required' });
  }
});

module.exports = app;
