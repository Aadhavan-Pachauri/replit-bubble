import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      const storedProducts = localStorage.getItem('products');
      const storedUsers = localStorage.getItem('users');
      const storedOrders = localStorage.getItem('orders');
      const storedMessages = localStorage.getItem('messages');

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    };

    loadData();
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold holo-text text-center mb-8">Access Denied</h1>
          <p className="text-center text-gray-400">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-extrabold holo-text">Admin Dashboard</h1>
          <span className="px-4 py-2 bg-purple-900 text-purple-300 rounded-full text-sm">Admin Access</span>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="mb-8 border-b border-gray-700">
          <div className="flex">
            <button 
              className={`dashboard-tab px-6 py-3 text-lg font-medium ${activeTab === 'products' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={`dashboard-tab px-6 py-3 text-lg font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
            <button 
              className={`dashboard-tab px-6 py-3 text-lg font-medium ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button 
              className={`dashboard-tab px-6 py-3 text-lg font-medium ${activeTab === 'messages' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 p-6 rounded-xl neon-glow mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold mr-4">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Products</span>
                  <span className="text-blue-400">{products.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Users</span>
                  <span className="text-blue-400">{users.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Orders</span>
                  <span className="text-blue-400">{orders.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Messages</span>
                  <span className="text-blue-400">{messages.length}</span>
                </div>
              </div>
            </div>
            
            {/* Add New Product Form */}
            <div className="bg-gray-800 p-6 rounded-xl neon-glow">
              <h3 className="text-xl font-semibold holo-text mb-4">Add New Product</h3>
              <div>
                <label className="block text-sm mb-1">Product Name*</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white mb-3 focus:ring-2 focus:ring-blue-400" placeholder="Product name" />
                
                <label className="block text-sm mb-1">Price ($)*</label>
                <input type="number" className="w-full p-2 rounded bg-gray-700 text-white mb-3 focus:ring-2 focus:ring-blue-400" placeholder="Price" />
                
                <label className="block text-sm mb-1">Description</label>
                <textarea className="w-full p-2 rounded bg-gray-700 text-white mb-3 focus:ring-2 focus:ring-blue-400" placeholder="Product description" rows={3}></textarea>
                
                <label className="block text-sm mb-1">Stock</label>
                <input type="number" className="w-full p-2 rounded bg-gray-700 text-white mb-3 focus:ring-2 focus:ring-blue-400" placeholder="Stock quantity" />
                
                <label className="block text-sm mb-1">Image URL</label>
                <input type="text" className="w-full p-2 rounded bg-gray-700 text-white mb-4 focus:ring-2 focus:ring-blue-400" placeholder="Image URL (optional)" />
                
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg neon-glow hover:from-blue-600 hover:to-purple-700 w-full">
                  Add Product
                </button>
                <p className="text-xs text-gray-400 mt-2">* Required fields</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Products Tab Content */}
            <div className={`dashboard-content ${activeTab === 'products' ? '' : 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Manage Products</h2>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Search products..." className="p-2 rounded bg-gray-700 text-white" />
                  <select className="p-2 rounded bg-gray-700 text-white">
                    <option>All Categories</option>
                    <option>Mechanical</option>
                    <option>Electronics</option>
                    <option>Models</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {products.map(product => (
                  <div key={product.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-400">${product.price}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">Edit</button>
                      <button className="text-red-400 hover:text-red-300">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Users Tab Content */}
            <div className={`dashboard-content ${activeTab === 'users' ? '' : 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Manage Users</h2>
                <input type="text" placeholder="Search users..." className="p-2 rounded bg-gray-700 text-white" />
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {users.map(user => (
                  <div key={user.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-gray-400">{user.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">Edit</button>
                      <button className="text-red-400 hover:text-red-300">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Orders Tab Content */}
            <div className={`dashboard-content ${activeTab === 'orders' ? '' : 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Order Management</h2>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Search orders..." className="p-2 rounded bg-gray-700 text-white" />
                  <select className="p-2 rounded bg-gray-700 text-white">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        order.status === 'shipped' ? 'bg-blue-900 text-blue-300' :
                        'bg-green-900 text-green-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-gray-400">Total: ${order.total}</p>
                    <p className="text-gray-400">Date: {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Messages Tab Content */}
            <div className={`dashboard-content ${activeTab === 'messages' ? '' : 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Customer Messages</h2>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Search messages..." className="p-2 rounded bg-gray-700 text-white" />
                  <select className="p-2 rounded bg-gray-700 text-white">
                    <option>All Messages</option>
                    <option>Unread</option>
                    <option>Read</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {messages.map(message => (
                  <div key={message.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold">{message.subject}</h3>
                      {!message.read && (
                        <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-sm">New</span>
                      )}
                    </div>
                    <p className="text-gray-400">{message.content}</p>
                    <p className="text-gray-400 text-sm mt-2">{new Date(message.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 