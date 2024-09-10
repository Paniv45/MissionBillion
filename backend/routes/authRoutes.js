const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure User model exists

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Perform validation and create user logic here
    // For example:
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

// Google Signup Route
router.post('/google-signup', async (req, res) => {
  try {
    const { email, name, googleId } = req.body;
    // Handle Google sign-up logic here
    // For example:
    const newUser = new User({ email, name, googleId });
    await newUser.save();
    res.status(201).send('Google user created successfully');
  } catch (err) {
    res.status(500).send('Error creating Google user');
  }
});

module.exports = router;
