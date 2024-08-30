import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import './CreateTest.css'; // Import CSS for styling
import axios from 'axios'; // Axios for API requests

const CreateTest = () => {
  const [chapters, setChapters] = useState({
    Physics: [],
    Chemistry: [],
    Maths: [],
  });

  useEffect(() => {
    // Fetch chapters data from the backend
    const fetchChapters = async () => {
      try {
        const response = await axios.get('http://example.com/api/chapters'); // Replace with your API endpoint
        setChapters(response.data); // Assuming the backend returns an object with Physics, Chemistry, and Maths arrays
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="create-test-container">
        <h1>Create Test</h1>
        <h2>Choose topics:</h2>
        <div className="subject-columns">
          <div className="subject-section">
            <h3>Physics</h3>
            {chapters.Physics.map((chapter, index) => (
              <div key={index} className="chapter-checkbox">
                <input type="checkbox" id={`physics-chapter-${index}`} />
                <label htmlFor={`physics-chapter-${index}`}>{chapter}</label>
              </div>
            ))}
          </div>

          <div className="subject-section">
            <h3>Chemistry</h3>
            {chapters.Chemistry.map((chapter, index) => (
              <div key={index} className="chapter-checkbox">
                <input type="checkbox" id={`chemistry-chapter-${index}`} />
                <label htmlFor={`chemistry-chapter-${index}`}>{chapter}</label>
              </div>
            ))}
          </div>

          <div className="subject-section">
            <h3>Maths</h3>
            {chapters.Maths.map((chapter, index) => (
              <div key={index} className="chapter-checkbox">
                <input type="checkbox" id={`maths-chapter-${index}`} />
                <label htmlFor={`maths-chapter-${index}`}>{chapter}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
