import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigationBar from './NavigationBar';
import { FaChalkboardTeacher, FaChartLine, FaClipboardList, FaLightbulb, FaRocket } from 'react-icons/fa'; // Import FaRocket for icon

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateTestClick = () => {
    navigate('/create-test');
  };

  return (
    <div>
      <NavigationBar />
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>
            Welcome to Your Learning Dashboard
          </h1>
          <p>
            Create your own tests, track progress, and improve your JEE preparation!
            <FaRocket className="header-icon" />
          </p>
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
            <p>Get real-time feedback after each test to help you improve.</p>
          </div>
        </section>

        <footer className="dashboard-footer">
          <p>© 2024 Your Learning Platform. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
