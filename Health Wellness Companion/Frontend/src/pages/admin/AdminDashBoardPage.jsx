import React from 'react';
import { Users, UserCheck, Edit } from 'lucide-react';
import { mockAllUsers, mockCommunityPosts } from '../../data/mockData';
import Card from '../../components/ui/Card';
import DashboardStatCard from '../../components/ui/DashboardStatCard';

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      {/* TODO: Add useEffect to fetch this data from admin endpoints */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder stats for admin */}
        <DashboardStatCard title="Total Users" value={mockAllUsers.length} icon={Users} color="bg-blue-500" />
        <DashboardStatCard title="Total Experts" value={mockAllUsers.filter(u => u.role === 'expert').length} icon={UserCheck} color="bg-green-500" />
        <DashboardStatCard title="Community Posts" value={mockCommunityPosts.length} icon={Edit} color="bg-purple-500" />
      </div>
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">App Analytics</h2>
        <p className="text-gray-600">This is where charts for user growth, engagement, and other app analytics would go.</p>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;