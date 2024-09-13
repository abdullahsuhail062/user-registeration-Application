const express = require('express');
const bodyParser = require('body-parser');
import { sql } from "@vercel/postgres"; // Vercel Postgres integration

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const errors = {};

  try {
    // Validate username
    if (!username || username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    } else {
      // Check for existing username in the database
      const existingUsername = await sql`
        SELECT * FROM USERS WHERE username = ${username}
      `;
      if (existingUsername.rowCount > 0) {
        errors.username = 'Username already exists';
      }
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@example\.com$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    } else {
      // Check for existing email in the database
      const existingEmail = await sql`
        SELECT * FROM USERS WHERE email = ${email}
      `;
      if (existingEmail.rowCount > 0) {
        errors.email = 'Email already exists';
      }
    }

    // Validate password (length check as an example)
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // If no validation errors, insert the new user
    await sql`
      INSERT INTO USERS (username, email, password)
      VALUES (${username}, ${email}, ${password})
    `;

    // Send a success response
    return res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    // Handle unexpected errors (like database errors)
    console.error("Error during user registration:", error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the app object
module.exports = app;
