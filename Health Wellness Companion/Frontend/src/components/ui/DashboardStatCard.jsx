import React from 'react';
import Card from './Card';

const DashboardStatCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <div className="flex items-center">
      <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </Card>
);

export default DashboardStatCard;