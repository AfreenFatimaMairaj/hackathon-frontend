import { Navigate } from 'react-router-dom';

// This component will check if the user is authenticated (logged in)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if a token exists in localStorage

  // If no token exists, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children (protected component/page)
  return children;
};

export default ProtectedRoute;
