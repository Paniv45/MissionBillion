const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String }, // Optional, only for Google sign-in
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

module.exports = User;
