import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in based on the token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // If the user is logged in, redirect to the dashboard
    if (token) {
      navigate('/dashboard');  // Redirect to dashboard if logged in
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-pastel-blue">
      {/* Home Page Content */}
      <div className="flex-grow flex items-center justify-center bg-pastel-yellow">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pastel-purple mb-4">
            Welcome to the Task Tracker
          </h1>
          <p className="text-lg text-pastel-gray mb-8">
            Manage your tasks effortlessly across multiple stages: To Do, In Progress, and Done.
          </p>

          {/* Show "Get Started" button if not logged in */}
          {!isLoggedIn && (
            <Link to="/login">
              <button className="bg-pastel-pink text-white px-6 py-3 rounded-lg hover:bg-pastel-purple transition">
                Get Started
              </button>
            </Link>
          )}

          {/* Redirect logged-in users to the dashboard */}
          {isLoggedIn && (
            <div>
              <p className="text-lg text-pastel-gray mb-4">You are already logged in.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
