import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigationBar from './NavigationBar';
import { FaChalkboardTeacher, FaChartLine, FaClipboardList, FaLightbulb, FaRocket } from 'react-icons/fa';
import LoginModal from './Login'; // Corrected import
import Footer from './Footer'; // Import the Footer component

const Dashboard = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize state
  const navigate = useNavigate();

  useEffect(() => {
    // Update the authentication state based on localStorage or other persistent storage
    setIsAuthenticated(localStorage.getItem('user') !== null);
  }, []);

  const handleCreateTestClick = () => {
    if (isAuthenticated) {
      navigate('/create-test');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div>
      <NavigationBar onLoginClick={() => setShowLoginModal(true)} />
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>Welcome to Your Learning Dashboard</h1>
          <p>Create your own tests, track progress, and improve your JEE preparation!</p>
          <button className="primary-button" onClick={handleCreateTestClick}>
            Create Test
          </button>
        </header>

        <section className="features-section">
          <div className="feature-card">
            <FaChalkboardTeacher className="feature-icon" />
            <h3>Custom Test Creation</h3>
            <p>Select chapters and difficulty levels to create personalized tests.</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Performance Tracking</h3>
            <p>Receive detailed scorecards and performance analysis.</p>
          </div>
          <div className="feature-card">
            <FaClipboardList className="feature-icon" />
            <h3>Detailed Reports</h3>
            <p>Get insights into your strengths and areas for improvement.</p>
          </div>
          <div className="feature-card">
            <FaLightbulb className="feature-icon" />
            <h3>Instant Feedback</h3>
            <p>Receive immediate feedback on your test performance.</p>
          </div>
          <div className="feature-card">
            <FaRocket className="feature-icon" />
            <h3>Enhanced Learning</h3>
            <p>Improve your knowledge and skills with targeted practice.</p>
          </div>
        </section>

        <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
