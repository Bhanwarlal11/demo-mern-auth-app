// config/jwt.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Generate JWT token
const generateToken = (userId) => {  
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION, // Expiry time from .env
  });
};

module.exports = { generateToken };