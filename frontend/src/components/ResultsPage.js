import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Result.css'; // Import CSS for styling

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract the test result data from location state
  const { score, totalQuestions, correctAnswers, incorrectAnswers } = location.state || {};

  // Debugging: log the location state to verify data
  console.log('Location State:', location.state);

  // Navigate back to the dashboard or another page
  const handleGoBack = () => {
    navigate('/');
  };

  // Check if there are results, if not, navigate back to create test or another relevant page
  if (score === undefined || totalQuestions === undefined) {
    return (
      <div className="result-page-container">
        <h1>No Results Available</h1>
        <button onClick={handleGoBack} className="go-back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="result-page-container">
      <h1>Test Results</h1>
      <div className="result-summary">
        <h2>Your Score: {score} / {totalQuestions}</h2>
        <p><strong>Correct Answers:</strong> {correctAnswers}</p>
        <p><strong>Incorrect Answers:</strong> {incorrectAnswers}</p>
        <p><strong>Percentage:</strong> {((score / totalQuestions) * 100).toFixed(2)}%</p>
      </div>

      <div className="result-actions">
        <button onClick={handleGoBack} className="go-back-button">
          Go Back to Dashboard
        </button>
        {/* You can add more actions like retake test or view detailed results here */}
      </div>
    </div>
  );
};

export default ResultsPage;
