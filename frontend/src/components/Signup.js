import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Updated import
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend signup API
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      navigate('/login'); // Redirect to login after successful signup
    } else {
      alert('Signup failed');
    }
  };

  const handleGoogleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential); // Updated function name
    // Process the Google sign-in data (e.g., send to backend to create a user or log in)
    const res = await fetch('/api/google-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: decoded.email, name: decoded.name, googleId: decoded.sub }),
    });
    if (res.ok) {
      navigate('/dashboard'); // Redirect to dashboard on successful Google sign-in
    } else {
      alert('Google sign-in failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In was unsuccessful. Try again later.', error);
    alert('Google Sign-In failed');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <div className="google-signup">
          <h3>Or Signup with Google</h3>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
      </div>
      {/* Add an overlay effect */}
      <div className="signup-overlay"></div>
    </div>
  );
};

export default Signup;
