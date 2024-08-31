// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import CreateTest from './components/CreateTest';
// import Login from './components/Login';

// const App = () => {
//   const isAuthenticated = () => {
//     return localStorage.getItem('user') !== null;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route
//           path="/create-test"
//           element={
//             // <ProtectedRoute isAuthenticated={isAuthenticated}>
//               <CreateTest />
//             // </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// // Wrapper component for protecting routes
// const ProtectedRoute = ({ isAuthenticated, children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginModal from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateTest from './components/CreateTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/" element={<Dashboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
