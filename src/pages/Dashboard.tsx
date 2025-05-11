import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold holo-text text-center mb-12">My Dashboard</h1>
        
        <div className="flex border-b border-gray-700 mb-6">
          <button 
            className={`dashboard-tab text-lg px-6 py-3 focus:outline-none ${activeTab === 'profile' ? 'active border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`dashboard-tab text-lg px-6 py-3 focus:outline-none ${activeTab === 'orders' ? 'active border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`dashboard-tab text-lg px-6 py-3 focus:outline-none ${activeTab === 'saved' ? 'active border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('saved')}
          >
            Saved Items
          </button>
          <button 
            className={`dashboard-tab text-lg px-6 py-3 focus:outline-none ${activeTab === 'messages' ? 'active border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
        </div>
        
        {/* Profile Tab */}
        <div className={`dashboard-content ${activeTab === 'profile' ? '' : 'hidden'}`}>
          <div className="bg-gray-800 rounded-xl p-8 neon-glow">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 mb-1">Name</p>
                <p className="text-xl mb-4">{user?.name || 'Loading...'}</p>
                
                <p className="text-gray-400 mb-1">Email</p>
                <p className="text-xl mb-4">{user?.email || 'Loading...'}</p>
                
                <p className="text-gray-400 mb-1">Account Type</p>
                <p className="text-xl">{user?.role || 'Loading...'}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Member Since</p>
                <p className="text-xl mb-4">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}</p>
                
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg neon-glow hover:bg-blue-600 mt-6">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders Tab */}
        <div className={`dashboard-content ${activeTab === 'orders' ? '' : 'hidden'}`}>
          <div className="bg-gray-800 rounded-xl p-8 neon-glow">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="space-y-6">
              <p className="text-gray-400">Loading orders...</p>
            </div>
          </div>
        </div>
        
        {/* Saved Items Tab */}
        <div className={`dashboard-content ${activeTab === 'saved' ? '' : 'hidden'}`}>
          <div className="bg-gray-800 rounded-xl p-8 neon-glow">
            <h2 className="text-2xl font-bold mb-6">Saved Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <p className="text-gray-400 col-span-3">You haven't saved any items yet.</p>
            </div>
          </div>
        </div>
        
        {/* Messages Tab */}
        <div className={`dashboard-content ${activeTab === 'messages' ? '' : 'hidden'}`}>
          <div className="bg-gray-800 rounded-xl p-8 neon-glow">
            <h2 className="text-2xl font-bold mb-6">My Messages</h2>
            <div className="space-y-4">
              <p className="text-gray-400">You have no messages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 