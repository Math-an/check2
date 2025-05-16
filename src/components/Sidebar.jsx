import React, { useEffect, useState } from 'react';
import api from '../utils/api'; // Assuming your api client is in src/utils/api.js

const Sidebar = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get('/users/me');
        setUserRole(response.data.role); // Assuming the role is returned as 'role' in the user object
      } catch (error) {
        console.error('Error fetching user role:', error);
        // Handle error (e.g., redirect to login if not authenticated)
        setUserRole(null); // Or set a default role or handle unauthorized state
      }
    };

    fetchUserRole();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
        </li>
        {/* Placeholder for conditional rendering based on user role */}
        {userRole === 'parent' && (
          <>
            <li className="mb-2">
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                My Children
              </a>
            </li>
            {/* Add parent-specific links here */}
          </>
        )}
        {userRole === 'caretaker' && (
          <>
            <li className="mb-2">
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                Assigned Children
              </a>
            </li>
            {/* Add caretaker-specific links here */}
          </>
        )}
        <li className="mb-2">
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;