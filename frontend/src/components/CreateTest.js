import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import './CreateTest.css';
import axios from 'axios';

const CreateTest = () => {
  const [chapters, setChapters] = useState({
    Physics: [],
    Chemistry: [],
    Maths: [],
  });
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [includePYQ, setIncludePYQ] = useState(false); // New state for PYQ selection
  const [selectedChapters, setSelectedChapters] = useState({
    Physics: [],
    Chemistry: [],
    Maths: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedClass) {
        try {
          const response = await axios.get(`http://example.com/api/chapters?class=${selectedClass}`);
          setChapters(response.data);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      }
    };

    fetchChapters();
  }, [selectedClass]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handlePYQChange = (event) => {
    setIncludePYQ(event.target.value === 'yes');
    if (event.target.value !== 'yes') {
      setSelectedYear(''); // Reset year if not PYQ
    }
  };

  const handleChapterChange = (subject, chapter) => {
    setSelectedChapters((prev) => {
      const updatedChapters = prev[subject].includes(chapter)
        ? prev[subject].filter((c) => c !== chapter)
        : [...prev[subject], chapter];
      return { ...prev, [subject]: updatedChapters };
    });
  };

  const handleStartTest = () => {
    navigate('/TestPage', { state: { selectedYear, selectedChapters, selectedClass, includePYQ } });
  };

  return (
    <div>
      <NavigationBar />

      <div className="create-test-container">
        <h1>Create Test</h1>

        {/* PYQ Selection */}
        <div className="dropdown-container">
          <h2>Include Previous Year Questions (PYQ)?</h2>
          <select value={includePYQ ? 'yes' : 'no'} onChange={handlePYQChange} className="class-dropdown">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* Conditional Year Selection */}
        {includePYQ && (
          <div className="dropdown-container">
            <h2>Choose Year for PYQ:</h2>
            <select value={selectedYear} onChange={handleYearChange} className="year-dropdown">
              <option value="">Select Year</option>
              <option value="mix">Mix</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
        )}

        {/* Class Selection Dropdown */}
        <div className="dropdown-container">
          <h2>Select Class:</h2>
          <select value={selectedClass} onChange={handleClassChange} className="class-dropdown">
            <option value="">Select Class</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="combined">Combined</option>
          </select>
        </div>

        <h2>Choose Topics:</h2>
        <div className="subject-columns">
          {Object.entries(chapters).map(([subject, chapterList]) => (
            <div key={subject} className="subject-section">
              <h3>{subject}</h3>
              {chapterList.map((chapter, index) => (
                <div key={index} className="chapter-checkbox">
                  <input
                    type="checkbox"
                    id={`${subject}-chapter-${index}`}
                    onChange={() => handleChapterChange(subject, chapter)}
                  />
                  <label htmlFor={`${subject}-chapter-${index}`}>{chapter}</label>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Start Test Button */}
        <button onClick={handleStartTest} className="start-test-button">
          Review Test Syllabus
        </button>
      </div>
    </div>
  );
};

export default CreateTest;
