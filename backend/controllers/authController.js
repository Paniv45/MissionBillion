const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model exists in the correct path

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google Signup Route
router.post('/google-signup', async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    // Create a new user from Google account
    const newUser = new User({ email, name, googleId });
    await newUser.save();

    res.status(201).json({ message: 'Google user created successfully' });
  } catch (err) {
    console.error('Google signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
