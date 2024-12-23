const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as needed
const { generateToken } = require("../config/jwt");

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || "ajkhfhauihguiha";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
const COOKIE_EXPIRATION =
  process.env.COOKIE_EXPIRATION || 7 * 24 * 60 * 60 * 1000; // 7 days

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully.",
        user: newUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }
    

    // Check if password matches
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    
    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
      maxAge: COOKIE_EXPIRATION,
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful.", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};

// Logout User
const logout = (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ success: true, message: "Logout successful." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error.", error: error.message });
  }
};


const getMyProfile = async (req, res) => {
    try {
      // Ensure user ID is attached to the request by the auth middleware
      const userId = req.user.id;
      if (!userId) {
        return res.status(401).json({success:false, message: "Unauthorized access." });
      }

  
      // Fetch the user profile, excluding sensitive data like password
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({success:true, message: "User not found." });
      }

      
  
      res.status(200).json({
        success: true,
        message: "Profile fetched successfully.",
        profile: user,
      });
    } catch (error) {
      res.status(500).json({success:false, message: "Server error.", error: error.message });
    }
};
  
  

module.exports = {
  register,
  login,
  logout,
  getMyProfile
};
