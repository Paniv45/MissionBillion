import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Correct import

const LoginModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = isSignup ? 'http://localhost:5000/api/auth/signup' : 'http://localhost:5000/api/auth/login';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('user', JSON.stringify(responseData.user)); // Store user in localStorage
        navigate('/create-test');
        handleClose();
        window.location.reload(); // Reload to update NavBar
      } else {
        alert(`${isSignup ? 'Signup' : 'Login'} failed`);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleForm = () => setIsSignup(!isSignup);

  const handleGoogleSuccess = async (response) => {
    try {
      const decoded = jwtDecode(response.credential); // Decoding the JWT token
      const res = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
        }),
      });

      if (res.ok) {
        const userData = await res.json();
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/create-test');
        handleClose();
        window.location.reload(); // Reload to update NavBar
      } else {
        alert('Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('An error occurred with Google login. Please try again.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign-In was unsuccessful. Try again later.', error);
    alert('Google Sign-In failed');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignup ? 'Sign Up' : 'Login'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {isSignup && (
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username || ''}
                onChange={handleChange}
                required={isSignup}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </Form>

        <div className="google-signin">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>

        <div className="signup-link">
          <p>
            {isSignup ? 'Already have an account? ' : 'New user? '}
            <Button variant="link" onClick={toggleForm}>
              {isSignup ? 'Login' : 'Sign Up'}
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
