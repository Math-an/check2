import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login'; // Assuming your login page component is named LoginPage
import Signup from './pages/signup'; // Assuming your signup page component is named Signup
import Dashboard from './pages/dashboard'; // Assuming your main dashboard page component is named Dashboard
// You might still want Navbar and Sidebar, but they could be within the Dashboard or a layout component
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to login for now */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* The Dashboard component will handle rendering Parent or Caretaker view internally */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
