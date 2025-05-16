import React, { useEffect, useState } from 'react';
import api from '../api'; // Assuming your api client is in '../api.js'

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/users/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        {/* Placeholder for logo or site title */}
        <div className="text-xl font-bold">ChildCare System</div>
        {/* Optional: Placeholder navigation links */}
        {/* <ul className="flex ml-8 space-x-4">
          <li><a href="#" className="hover:text-blue-200">Home</a></li>
          <li><a href="#" className="hover:text-blue-200">About</a></li>
          <li><a href="#" className="hover:text-blue-200">Contact</a></li>
        </ul> */}
      </div>
      {/* Profile Section */}
      <div className="flex items-center space-x-2">
        {/* Placeholder for profile icon */}
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">
          {/* Initials or icon */}
          JD
        </div>
        {/* Placeholder for username */}
        <div className="text-sm">John Doe</div>
        {/* Optional: Dropdown or link for profile */}
        {/* <button className="ml-2 p-1 hover:bg-blue-500 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;