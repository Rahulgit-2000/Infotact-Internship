import React from 'react';
import Sidebar from './Sidebar';

// Page Imports
import DashboardPage from '../../pages/DashboardPage';
import LogDataPage from '../../pages/LogDataPage';
import MyPlansPage from '../../pages/MyPlansPage';
import ProgressPage from '../../pages/ProgressPage';
import CommunityPage from '../../pages/CommunityPage';
import ExpertsPage from '../../pages/ExpertsPage';
import SettingsPage from '../../pages/SettingsPage';

const DashboardLayout = ({ user, onLogout, currentPage, setCurrentPage, upcomingBookings, handleNewBooking }) => {
  // This function acts as a "router" to render the correct page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        // Pass bookings to dashboard
        return <DashboardPage upcomingBookings={upcomingBookings} />;
      case 'logData':
        return <LogDataPage />;
      case 'plans':
        return <MyPlansPage />;
      case 'progress': 
        return <ProgressPage user={user} />;
      case 'community':
        // Pass user info for posting
        return <CommunityPage user={user} />;
      case 'experts':
        // Pass booking handler to experts page
        return <ExpertsPage handleNewBooking={handleNewBooking} />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return <DashboardPage upcomingBookings={upcomingBookings} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        user={user}
        onLogout={onLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-1 overflow-y-auto p-6 md:pl-72 pt-20 md:pt-6">
        {/* The content area where pages are rendered */}
        {renderPage()}
      </main>
    </div>
  );
};

export default DashboardLayout;