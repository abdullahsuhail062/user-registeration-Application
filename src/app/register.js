const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Add logic to save user to the database (e.g., MongoDB, MySQL)
  // For now, just return a success response
  if (email && password) {
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ error: 'Email and password are required' });
  }
});

module.exports = app;
