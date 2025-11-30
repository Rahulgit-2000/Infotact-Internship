import React, { useState } from 'react';
import {
  BarChart2, UserCog, LogOut, Menu, X, ShieldCheck
} from 'lucide-react';

const AdminSidebar = ({ user, onLogout, currentPage, setCurrentPage }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: BarChart2, page: 'adminDashboard' },
    { name: 'User Management', icon: UserCog, page: 'userManagement' },
  ];

  const NavContent = () => (
    <div className="flex h-full flex-col bg-gray-900 text-white"> {/* Darker bg for admin */}
      {/* Header */}
      <div className="flex h-16 flex-shrink-0 items-center justify-between px-4">
        <span className="text-2xl font-bold text-red-400">Wellness+ ADMIN</span>
        <button onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-white md:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Profile Section */}
      <div className="flex-shrink-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-full bg-red-800 p-2">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-red-400">Administrator</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setCurrentPage(item.page);
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className={`flex w-full items-center rounded-md px-2 py-2 text-sm font-medium ${
              currentPage === item.page
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="mr-3 h-6 w-6" />
            {item.name}
          </button>
        ))}
      </nav>
      
      {/* Footer (Logout) */}
      <div className="flex-shrink-0 p-2">
        <button
          onClick={onLogout}
          className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-3 h-6 w-6" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-20 rounded-md bg-gray-900 p-2 text-white md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Sidebar (sliding) */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <NavContent />
      </div>
      
      {/* Desktop Sidebar (static) */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64">
        <NavContent />
      </div>
    </>
  );
};

export default AdminSidebar;