import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import UserDropdown from './UserDropdown';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { isDarkMode, toggleTheme, language, setLanguage } = useSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const cartItemsCount = cartItems?.reduce((total, item) => total + (item?.quantity || 0), 0) || 0;

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleAdminClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/login');
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/cart');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 holo-bg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-4xl font-extrabold holo-text">Bubble</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-lg hover:holo-text">Home</Link>
            <Link to="/shop" className="nav-link text-lg hover:holo-text">Shop</Link>
            <Link to="/about" className="nav-link text-lg hover:holo-text">About</Link>
            <Link to="/support" className="nav-link text-lg hover:holo-text">Support</Link>
            <Link to="/contact" className="nav-link text-lg hover:holo-text">Contact Us</Link>
            <button
              onClick={handleCartClick}
              className="nav-link text-lg hover:holo-text"
            >
              Cart ({cartItemsCount})
            </button>
            {user ? (
              <UserDropdown />
            ) : (
              <Link to="/login" className="nav-link text-lg hover:holo-text">Login</Link>
            )}
            <button
              onClick={handleSettingsClick}
              className="nav-link text-lg hover:holo-text"
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-blue-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block nav-link text-lg hover:holo-text">Home</Link>
            <Link to="/shop" className="block nav-link text-lg hover:holo-text">Shop</Link>
            <Link to="/about" className="block nav-link text-lg hover:holo-text">About</Link>
            <Link to="/support" className="block nav-link text-lg hover:holo-text">Support</Link>
            <Link to="/contact" className="block nav-link text-lg hover:holo-text">Contact Us</Link>
            <button
              onClick={handleCartClick}
              className="block w-full text-left nav-link text-lg hover:holo-text"
            >
              Cart ({cartItemsCount})
            </button>
            {user ? (
              <div className="space-y-4">
                <Link to="/dashboard" className="block nav-link text-lg hover:holo-text">Dashboard</Link>
                {user.role === 'admin' && (
                  <button
                    onClick={handleAdminClick}
                    className="block w-full text-left nav-link text-lg hover:holo-text"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    // Handle logout
                    navigate('/');
                  }}
                  className="block w-full text-left nav-link text-lg hover:holo-text"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="block nav-link text-lg hover:holo-text">Login</Link>
            )}
            <button
              onClick={handleSettingsClick}
              className="block w-full text-left nav-link text-lg hover:holo-text"
            >
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsSettingsOpen(false)}></div>
          <div className="relative bg-gray-900 p-8 rounded-xl shadow-xl max-w-md w-full mx-4 neon-glow my-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold holo-text">Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-2xl hover:text-blue-400"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Theme Preferences */}
              <div>
                <h3 className="text-xl mb-4 text-white">Theme Preferences</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isDarkMode}
                      onChange={toggleTheme}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-xl mb-4 text-white">Language</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-2 rounded-lg ${
                      language === 'en'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`px-4 py-2 rounded-lg ${
                      language === 'es'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Español
                  </button>
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-4 py-2 rounded-lg ${
                      language === 'fr'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setLanguage('de')}
                    className={`px-4 py-2 rounded-lg ${
                      language === 'de'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Deutsch
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;