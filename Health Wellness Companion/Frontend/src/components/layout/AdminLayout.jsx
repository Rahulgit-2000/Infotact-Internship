import React from 'react';
import AdminSidebar from './AdminSidebar';

// Admin Page Imports
import AdminDashboardPage from '../../pages/admin/AdminDashboardPage';
import UserManagementPage from '../../pages/admin/UserManagementPage';

const AdminLayout = ({ user, onLogout, currentPage, setCurrentPage }) => {
  // This function acts as a "router" to render the correct admin page
  const renderPage = () => {
    switch (currentPage) {
      case 'adminDashboard':
        return <AdminDashboardPage />;
      case 'userManagement':
        return <UserManagementPage />;
      default:
        return <AdminDashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar
        user={user}
        onLogout={onLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="flex-1 overflow-y-auto p-6 md:pl-72 pt-20 md:pt-6">
        {/* The content area where admin pages are rendered */}
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminLayout;