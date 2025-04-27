import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []); // Re-run effect only once on mount to check for logged-in state

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 text-gray-200 p-4 w-full flex justify-between items-center">
      <div className="font-bold text-xl text-white">
        <Link to="/">To Do App</Link>
      </div>
      <div className="flex space-x-6 ml-auto">
        <Link to="/" className="hover:text-shadow-green-400">Home</Link>

        {/* If the user is logged in, show these links */}
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-teal-400">Dashboard</Link>
            <Link to="/add-task" className="hover:text-teal-400">Add Task</Link>
            <Link to="/your-tasks" className="hover:text-teal-400">Your Tasks</Link>
            <button onClick={handleLogout} className="hover:text-teal-400 bg-teal-600 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="hover:text-teal-400">Register</Link>
            <Link to="/login" className="hover:text-teal-400">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
