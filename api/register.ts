import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server';

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<VercelResponse> {
  if (request.method === 'POST') {
    const { username, email, password } = request.body;
    const errors: ValidationErrors = {};

    try {
      // Validate username
      if (!username || username.length < 3) {
        errors.username = 'Username must be at least 3 characters long';
      } else {
        const existingUsername = await sql`
          SELECT * FROM USERS WHERE username = ${username}
        `;
        // Null-safe check for rowCount
        if (existingUsername?.rowCount && existingUsername.rowCount > 0) {
          errors.username = 'Username already exists';
        }
      }

      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@example\.com$/;
      if (!email || !emailRegex.test(email)) {
        errors.email = 'Invalid email address';
      } else {
        const existingEmail = await sql`
          SELECT * FROM USERS WHERE email = ${email}
        `;
        // Null-safe check for rowCount
        if (existingEmail?.rowCount && existingEmail.rowCount > 0) {
          errors.email = 'Email already exists';
        }
      }

      // Validate password (length check as an example)
      if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      // If there are validation errors, return them
      if (Object.keys(errors).length > 0) {
        return response.status(400).json({ errors });
      }

      // If no validation errors, insert the new user
      await sql`
        INSERT INTO USERS (username, email, password)
        VALUES (${username}, ${email}, ${password})
      `;

      // Send a success response
      return response.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
      // Handle unexpected errors (like database errors)
      console.error("Error during user registration:", error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return response.status(405).json({ error: 'Method not allowed' });
  }
}


module.exports = app
