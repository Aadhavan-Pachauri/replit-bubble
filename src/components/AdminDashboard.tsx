import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isAdminDashboardOpen, toggleAdminDashboard } = useSettings();

  if (!isAdminDashboardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gray-800 rounded-xl p-8 w-full max-w-4xl mx-4 neon-glow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold holo-text">Admin Dashboard</h2>
          <button 
            onClick={toggleAdminDashboard}
            className="text-2xl hover:text-blue-400 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* User Management Section */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Current User: {user?.name}</span>
                <span className="text-blue-400">Admin</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email: {user?.email}</span>
                <span className="text-green-400">Verified</span>
              </div>
            </div>
          </div>

          {/* System Statistics Section */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">System Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">Total Users</h4>
                <p className="text-3xl font-bold text-blue-400">1,234</p>
              </div>
              <div className="bg-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">Active Sessions</h4>
                <p className="text-3xl font-bold text-green-400">56</p>
              </div>
              <div className="bg-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium mb-2">System Load</h4>
                <p className="text-3xl font-bold text-yellow-400">42%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors">
                Manage Users
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors">
                View Logs
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg transition-colors">
                System Settings
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors">
                Emergency Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 