import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, onShowLoginModal, children }) => {
  // Check if the user is authenticated
  if (!isAuthenticated) {
    onShowLoginModal();
    return null; // Render nothing while showing the modal
  }

  // Render the child component if authenticated
  return children;
};

export default ProtectedRoute;
