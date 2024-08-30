import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigationBar from './NavigationBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCreateTestClick = () => {
    console.log("Navigating to /create-test");
    navigate('/create-test');
  };

  return (
    <div className="dashboard">
      <NavigationBar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome to Dashboard</h1>
          <p>Practice Makes Perfect! Create your own tests and track your progress.</p>
          <button className="button" onClick={handleCreateTestClick}>
            Create Test
          </button>
        </div>
        </div>
        <div className="dashboard-info">
          <div className="info-box">
            <h2>Features</h2>
            <ul>
              <li>Create custom tests</li>
              <li>Select chapters and difficulty levels</li>
              <li>Receive detailed scorecards</li>
              <li>Analyze your performance</li>
            </ul>
          </div>
          <div className="info-box">
            <h2>How It Works</h2>
            <p>
              1. Choose chapters and difficulty levels.<br />
              2. Create your own test.<br />
              3. Take the test and receive instant feedback.<br />
              4. Analyze your performance to improve.
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard;
