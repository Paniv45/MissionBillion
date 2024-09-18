import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateTest from './components/CreateTest';
import TestPage from './components/TestPage';
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
        <Route path="/TestPage" element={<TestPage />} />
      </Routes>
      {showLoginModal && <LoginModal show={showLoginModal} handleClose={() => setShowLoginModal(false)} />}
    </Router>
  );
};

export default App;
