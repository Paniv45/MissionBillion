import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StartTest.css'; // Import CSS for styling

const StartTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedYear, selectedChapters } = location.state || { selectedYear: '', selectedChapters: {} };

  // Example data for questions, in a real application this would be fetched from an API
  const questionsData = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
  ];

  const [questions, setQuestions] = useState(questionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(1800); // 30 minutes

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    alert('Test submitted!');
    navigate('/ResultsPage', { state: { selectedOptions } }); // Navigate to results page
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="test-screen-container">
      <div className="test-timer">
        Time Left: {formatTime(timer)}
      </div>
      {questions.length > 0 ? (
        <div className="question-section">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  id={`option${index}`}
                  name={`question${questions[currentQuestionIndex].id}`}
                  value={option}
                  checked={selectedOptions[questions[currentQuestionIndex].id] === option}
                  onChange={() => handleOptionChange(questions[currentQuestionIndex].id, option)}
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        <button onClick={handleSubmitTest}>Submit Test</button>
      </div>
    </div>
  );
};

export default StartTest;
