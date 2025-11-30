import React, { useState, useEffect } from 'react';
import { mockUserData, mockAdminUser } from './data/mockData';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**
 * This is the root component of the application.
 * It manages authentication state and renders the correct
 * view (either the Auth flow or the main App).
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authPage, setAuthPage] = useState('login'); // 'login' or 'register'
  
  // This state manages the "page" *inside* the dashboard,
  // acting as a simple router.
  const [currentPage, setCurrentPage] =useState('dashboard');
  
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  // Simulate checking for a user session on app load
  useEffect(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }, []);

  const handleLogin = (userData) => {
    console.log("User logged in:", userData);
    setCurrentUser(userData);
    setIsAuthenticated(true);
    // Set default page based on role
    if (userData.role === 'admin') {
      setCurrentPage('adminDashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleRegister = (userData) => {
    console.log("User registered:", userData);
    setCurrentUser({ ...userData, role: 'user' }); // Ensure role is 'user' on register
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthPage('login'); // Reset to login page
    setUpcomingBookings([]); // Clear bookings on logout
  };
  
  const handleNewBooking = (expert, date, time) => {
    const newBooking = {
      id: `b${upcomingBookings.length + 1}`,
      expertName: expert.name,
      specialty: expert.specialty,
      date,
      time,
    };
    setUpcomingBookings([newBooking, ...upcomingBookings]);
    setCurrentPage('dashboard');
    console.log("New booking added:", newBooking);
  };

  // --- RENDER LOGIC ---

  if (!isAuthenticated) {
    // If NOT logged in, show the Auth flow
    if (authPage === 'login') {
      return <LoginPage onLogin={handleLogin} onSetPage={setAuthPage} />;
    }
    if (authPage === 'register') {
      return <RegisterPage onRegister={handleRegister} onSetPage={setAuthPage} />;
    }
  }

  // Render layout based on user role
  if (currentUser.role === 'admin') {
    return (
      <AdminLayout
        user={currentUser}
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  // If logged in and role is not admin, show the main application layout
  return (
    <DashboardLayout
      user={currentUser}
      onLogout={handleLogout}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      upcomingBookings={upcomingBookings}
      handleNewBooking={handleNewBooking}
    />
  );
}