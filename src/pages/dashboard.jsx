import React, { useState, useEffect } from 'react';
import ParentDashboard from '../components/ParentDashboard';
import CaretakerDashboard from '../components/CaretakerDashboard';
import { getUserById } from '../api'; // Assuming you have a getUserById function in api.js

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  // Placeholder for user role - replace with actual authentication logic
  const [userRole, setUserRole] = useState('parent'); // 'parent' or 'caretaker'

  return (
    <div className="flex flex-col h-screen">
      {/* Optional: Include Navbar and Sidebar here if they are part of the dashboard layout */}
      {/* For simplicity, we'll just render the dashboard content */}
      <div className="flex-1 overflow-y-auto p-4">
        {userRole === 'parent' ? (
          <ParentDashboard />
        ) : userRole === 'caretaker' ? (
          <CaretakerDashboard />
        ) : (
          <div>Loading dashboard...</div> // Or a loading spinner
        )}
      </div>
    </div>
  );
};


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming '/users/me' endpoint exists and returns user data including role
        const response = await getUserById('me'); // Use 'me' or the actual user ID
        setUserData(response.data);
        setUserRole(response.data.role);

        // Placeholder logic to fetch data based on role
        if (response.data.role === 'parent') {
          // await fetchParentDashboardData(); // Implement this function
        } else if (response.data.role === 'caretaker') {
          // await fetchCaretakerDashboardData(); // Implement this function
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error (e.g., redirect to login)
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

export default Dashboard;