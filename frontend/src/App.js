import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateTest from './components/CreateTest';
import TestPage from './components/TestPage';
import StartTest from './components/StartTest'; // Import the new StartTest component
import ResultsPage from './components/ResultsPage'; // Import the Results page component
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-test"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated()}
              onShowLoginModal={() => setShowLoginModal(true)}
            >
              <CreateTest />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/TestPage" element={<TestPage />} /> {/* Update the route to match the existing TestPage route */}
        <Route path="/StartTest" element={<StartTest />} /> {/* Add the StartTest route */}
        <Route path="/ResultsPage" element={<ResultsPage />} /> {/* Add a route for the results page */}
      </Routes>
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}
    </Router>
  );
};

export default App;
