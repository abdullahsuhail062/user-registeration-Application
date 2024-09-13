const express = require('express');
const bodyParser = require('body-parser');
import { sql } from "@vercel/postgres"; // Vercel Postgres integration

const app = express();


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// POST route to validate username, email, and password
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const errors = {};

  try {
    // Check for existing username
    const existingUsername = await sql`
      SELECT * FROM USERS WHERE username = ${username}
    `;

    if (existingUsername.rowCount > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check for existing email
    const existingEmail = await sql`
      SELECT * FROM USERS WHERE email = ${email}
    `;

    if (existingEmail.rowCount > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // If both username and email are unique, insert the new user
    const result = await sql`
      INSERT INTO USERS (username, email, password)
      VALUES (${username}, ${email}, ${password})
    `;

    // Send a success response
    res.status(201).send({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({ error: "Error registering user" });
  }
});



  // 1. Validate Username
  if (!username || username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }else if (existingUsername) { errors.username = 'Username already exist'
    
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


module.exports = app;

// Start the server
