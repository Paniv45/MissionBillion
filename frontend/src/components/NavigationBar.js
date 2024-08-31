import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Ensure you import the correct CSS file

const NavigationBar = ({ onLoginClick }) => {
  // State to manage if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Replace this with your actual authentication check logic
    const checkAuth = () => {
      // Example logic for checking login status
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    };

    checkAuth(); // Check authentication status on component mount
  }, []);

  const handleLogout = () => {
    // Example logout logic
    localStorage.removeItem('user');
    setIsLoggedIn(false);
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
          <Nav className="navbar-nav-right">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/account">Account</Nav.Link>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
              </>
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
