import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './NavigationBar.css';

const NavigationBar = ({ onLoginClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user); // Only parse if user is not null
          setIsLoggedIn(true);
          setUsername(userData.username || '');
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user'); // Optionally clear invalid user data
        }
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/'); // Redirect to dashboard
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav-left">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
          <div className="navbar-center">
            {isLoggedIn && (
              <span className="navbar-greeting">Hello, {username}</span>
            )}
          </div>
          <Nav className="navbar-nav-right">
            {isLoggedIn ? (
              <Button variant="link" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button variant="link" onClick={onLoginClick}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
