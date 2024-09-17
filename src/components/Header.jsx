import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-[#131324] text-white mb-2">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">EventKick</Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/events" className="hover:text-gray-300">Events</Link>
          <Link to="/plan" className="hover:text-gray-300">Plan</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login/Signup</Link>
          )}
        </nav>
        <button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-opacity-5 backdrop-filter backdrop-blur-sm text-white flex flex-col items-start space-y-4 p-4 z-50">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/events" className="hover:text-gray-300">Events</Link>
            <Link to="/plan" className="hover:text-gray-300">Plan</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                <button onClick={handleLogout} className="justify-start text-start items-start hover:text-gray-300">Logout</button>
              </>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login/Signup</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
