const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database unavailable. Please start local MongoDB or set a valid MONGO_URI in backend/.env' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (role defaults to 'farmer' in schema, password hashed in pre-save)
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'MongooseError' || error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: 'Database connection timed out. Please check if MongoDB is running.' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database unavailable. Please start local MongoDB or set a valid MONGO_URI in backend/.env' 
      });
    }

    // Check for user email
    const user = await User.findOne({ email });

    // Check password
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    if (error.name === 'MongooseError' || error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: 'Database connection timed out. Please check if MongoDB is running.' });
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
