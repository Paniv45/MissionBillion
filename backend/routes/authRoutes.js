const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Error creating user');
  }
});

// Google Signup/Login Route
router.post('/google-login', async (req, res) => {
  try {
    const { email, name, googleId } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ user: existingUser });
    }
    const newUser = new User({ email, name, googleId });
    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error('Google login error:', err);
    res.status(500).send('Error logging in with Google');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error during login');
  }
});

module.exports = router;
