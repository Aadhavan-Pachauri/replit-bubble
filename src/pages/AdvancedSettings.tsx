import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsType } from '../types';

const AdvancedSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'dark',
    notifications: true,
    language: 'en'
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold holo-text">Advanced Settings</h1>
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
            >
              Back to Home
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl neon-glow p-8 space-y-8">
            {/* Display Settings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Display Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Enable Animations</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.animations}
                      onChange={(e) => setSettings({ ...settings, animations: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Show Product Images</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.showImages}
                      onChange={(e) => setSettings({ ...settings, showImages: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Enable Holographic Effects</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.holographic}
                      onChange={(e) => setSettings({ ...settings, holographic: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Save Browsing History</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.saveHistory}
                      onChange={(e) => setSettings({ ...settings, saveHistory: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Share Usage Data</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.shareData}
                      onChange={(e) => setSettings({ ...settings, shareData: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Performance Settings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Performance Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Enable Caching</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.caching}
                      onChange={(e) => setSettings({ ...settings, caching: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span>Low Bandwidth Mode</span>
                  <label className="settings-toggle">
                    <input
                      type="checkbox"
                      checked={settings.lowBandwidth}
                      onChange={(e) => setSettings({ ...settings, lowBandwidth: e.target.checked })}
                    />
                    <span className="settings-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-8 border-t border-gray-700">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Save Advanced Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings; 