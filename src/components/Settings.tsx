import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import AdminDashboard from './AdminDashboard';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { settings, updateSettings, toggleAdminDashboard } = useSettings();

  const handleThemeChange = (theme: 'dark' | 'light') => {
    updateSettings({ theme });
  };

  const handleNotificationChange = (notifications: boolean) => {
    updateSettings({ notifications });
  };

  const handleLanguageChange = (language: string) => {
    updateSettings({ language });
  };

  const handleAdvancedSettings = () => {
    navigate('/advanced-settings');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-gray-800 rounded-xl p-8 w-full max-w-2xl mx-4 neon-glow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold holo-text">Settings</h2>
            <button 
              onClick={onClose} 
              className="text-2xl hover:text-blue-400 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl mb-3">Theme Preferences</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`px-4 py-2 rounded transition-colors ${
                    settings.theme === 'dark' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Dark Mode
                </button>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`px-4 py-2 rounded transition-colors ${
                    settings.theme === 'light' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Light Mode
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-3">Notifications</h3>
              <div className="flex items-center justify-between">
                <span>Email Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleNotificationChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-3">Language</h3>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full bg-gray-700 rounded-lg p-2 border border-gray-600 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {isAdmin && (
              <div>
                <h3 className="text-xl mb-3">Admin Controls</h3>
                <button
                  onClick={toggleAdminDashboard}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-colors"
                >
                  Open Admin Dashboard
                </button>
              </div>
            )}

            <button
              onClick={handleAdvancedSettings}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors"
            >
              Advanced Settings
            </button>
          </div>
        </div>
      </div>
      <AdminDashboard />
    </>
  );
};

export default Settings;