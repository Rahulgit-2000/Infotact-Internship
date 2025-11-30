import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { mockAllUsers } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const UserManagementPage = () => {
  // TODO: Add useEffect to fetch users from /api/admin/users (Section 3.1)
  const [users, setUsers] = useState(mockAllUsers);

  const handleDeleteUser = (userId) => {
    // This is a mock delete.
    if (window.confirm('Are you sure you want to delete this user? This is a mock action.')) {
      // API Call: DELETE /api/admin/users/:id
      setUsers(users.filter(user => user.id !== userId));
      console.log("Mock delete user:", userId);
    }
  };
  
  const handleEditRole = (userId) => {
    // This is a mock edit.
    const newRole = window.prompt("Enter new role (user, expert, admin):");
    if (newRole && ['user', 'expert', 'admin'].includes(newRole)) {
      // API Call: PUT /api/admin/users/:id/role
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      console.log("Mock role change:", userId, newRole);
    } else if (newRole) {
      alert("Invalid role. Please enter 'user', 'expert', or 'admin'.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">ID: {user.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'expert' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleEditRole(user.id)} className="text-green-600 hover:text-green-900">
                    <Edit className="h-5 w-5 inline-block" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default UserManagementPage;