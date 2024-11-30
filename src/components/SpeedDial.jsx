import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext';

const SpeedDial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, setState, logout } = useContext(AppContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  const toggleSpeedDial = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-2 right-4 z-50">
      {/* Main Speed Dial Button */}
      <div className="relative">
        <button
          onClick={toggleSpeedDial}
          className="w-16 h-16 bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none"
        >
          {/* Profile Photo */}
          <img
            src='/avatar.jpg'
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </button>

        {/* Expanded Buttons */}
        {isOpen && (
          <div className="absolute top-20 right-0 flex flex-col items-end space-y-3">
            {/* Dashboard Button */}
            <Link
              to="/dashboard"
              className="flex items-center bg-white p-4 border-2 border-gray-400 rounded-full shadow-md hover:bg-green-200 transition text-xl"
            >
            📊
            </Link>

            {/* Settings Button */}
            <Link
              to="/settings"
              className="flex p-4 border-2 border-gray-400 rounded-full shadow-md transition text-xl items-center bg-white hover:bg-gray-200"
            >
            ⚙️</Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center bg-white border-gray-400 border-2 p-4 text-xl rounded-full shadow-md hover:bg-red-100 transition"
            >
            🚪
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedDial;
