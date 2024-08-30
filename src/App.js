// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateTest from './components/CreateTest'; // Ensure this path is correct

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Home route */}
        <Route path="/create-test" element={<CreateTest />} /> {/* Create Test route */}
      </Routes>
    </Router>
  );
};

export default App;
