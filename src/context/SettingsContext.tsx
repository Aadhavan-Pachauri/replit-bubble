import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings } from '../types';

type Theme = 'light' | 'dark';

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isAdminDashboardOpen: boolean;
  toggleAdminDashboard: () => void;
  isDarkMode: boolean;
}

const defaultSettings: Settings = {
  theme: 'dark',
  notifications: true,
  language: 'en',
  animations: true,
  showImages: true,
  holographic: true,
  saveHistory: true,
  shareData: false,
  caching: true,
  lowBandwidth: false,
  darkMode: true,
  odooLike: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    // Apply theme to document root
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-mode');
      root.style.setProperty('--bg-primary', '#0a0e17');
      root.style.setProperty('--text-primary', '#e2e8f0');
      root.style.setProperty('--bg-secondary', '#1a1f2e');
      root.style.setProperty('--text-secondary', '#94a3b8');
    } else {
      root.classList.remove('dark-mode');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--bg-secondary', '#f1f5f9');
      root.style.setProperty('--text-secondary', '#475569');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
  };

  const toggleAdminDashboard = () => {
    setIsAdminDashboardOpen(prev => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        currency,
        setCurrency,
        settings,
        updateSettings,
        isAdminDashboardOpen,
        toggleAdminDashboard,
        isDarkMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 