import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TestPage.css'; // Import CSS for styling

const TestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedYear, selectedChapters } = location.state || { selectedYear: '', selectedChapters: {} };

  const handleStartTest = () => {
    // Logic for starting the test can go here
    console.log('Test started with the following details:', { selectedYear, selectedChapters });
    alert('Test started!');
    navigate('/StartTest'); // Correct way to navigate programmatically
  };

  return (
    <div className="test-page-container">
      <h1>Test for {selectedYear || 'Year not selected'}</h1>

      <div className="subject-columns">
        {Object.entries(selectedChapters).map(([subject, chapters]) => (
          <div key={subject} className="subject-section">
            <h3>{subject}</h3>
            {chapters.length > 0 ? (
              chapters.map((chapter, index) => (
                <div key={index} className="chapter-item">
                  <h6>{chapter}</h6>
                </div>
              ))
            ) : (
              <p>No chapters selected for {subject}.</p>
            )}
          </div>
        ))}
      </div>

      {/* Guidance Section for JEE Mains */}
      <div className="guidance-section">
        <h2>Guidance for JEE Mains Paper</h2>
        <ul>
          <li>
            <strong>Exam Pattern:</strong> The paper consists of three sections: Physics, Chemistry, and Mathematics. Each section contains 20 multiple-choice questions (MCQs) and 10 numerical value-based questions, out of which 5 are to be attempted.
          </li>
          <li>
            <strong>Marking Scheme:</strong> Each correct answer will be awarded 4 marks, and 1 mark will be deducted for every incorrect answer in MCQs. For numerical value-based questions, no negative marking is applied.
          </li>
          <li>
            <strong>Time Management:</strong> You have 3 hours to complete the test. It is recommended to allocate 1 hour per subject and keep 30 minutes for review and tough questions.
          </li>
          <li>
            <strong>Strategy:</strong> Start with the subject you are most comfortable with to build confidence. Attempt numerical questions if you are sure of the calculations since they have no negative marking.
          </li>
          <li>
            <strong>Tools Allowed:</strong> Use only the rough sheets provided. Calculators, mobile phones, and other electronic devices are not allowed inside the exam hall.
          </li>
          <li>
            <strong>Filling OMR Sheet:</strong> Ensure that you fill in the OMR sheet correctly. Avoid erasing or striking through answers as the OMR sheets are machine-readable.
          </li>
          <li>
            <strong>Important:</strong> Read each question carefully before answering. Avoid spending too much time on one question. Mark doubtful answers and return to them later if time permits.
          </li>
        </ul>
      </div>

      {/* Start Test Button */}
      <button onClick={handleStartTest} className="start-test-button">
        Start Test
      </button>
    </div>
  );
};

export default TestPage;
