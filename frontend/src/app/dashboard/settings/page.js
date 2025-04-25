"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Bell,
  Lock,
  Moon,
  Sun,
  Globe,
  Trash2,
  LogOut,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  Check
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { MotionDiv } from "@/components/MotionWrapper";

// Settings page skeleton loader
const SettingsSkeletonLoader = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
          ))}
        </div>

        {/* Settings panel skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          {/* Section heading skeleton */}
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mb-6"></div>

          {/* Settings items skeleton */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="h-6 w-32 bg-red-300 dark:bg-red-700 rounded-md animate-pulse mb-6"></div>

          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse mb-2"></div>
                    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
                <div className="h-10 w-24 bg-red-200 dark:bg-red-700 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle component for settings
const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
        enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      onClick={onChange}
    >
      <span className="sr-only">Toggle setting</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
      />
    </button>
  );
};

// Tab button component
const TabButton = ({ active, icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </button>
  );
};

export default function SettingsPage() {
  const { user, loading: authLoading, isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      messageNotifications: true,
      propertyUpdates: false,
      marketingEmails: false
    },
    privacy: {
      showProfile: true,
      showContactInfo: false,
      activityTracking: true
    },
    appearance: {
      darkMode: false,
      language: 'english'
    }
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Initialize loading state
  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, you would fetch user settings from an API
      // For now, just simulate a loading delay
      setTimeout(() => {
        // Check system theme preference for dark mode initial state
        if (typeof window !== 'undefined') {
          const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setSettings(prev => ({
            ...prev,
            appearance: {
              ...prev.appearance,
              darkMode: prefersDarkMode
            }
          }));
        }

        setIsLoading(false);
      }, 1200);
    }
  }, [isAuthenticated]);

  // Handle toggle changes
  const handleToggle = (section, setting) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [setting]: !prev[section][setting]
      }
    }));

    // In a real app, you would save this to an API
    setMessage({
      type: 'success',
      text: 'Setting updated successfully!'
    });

    // Clear message after a few seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        language: e.target.value
      }
    }));

    // In a real app, you would save this to an API
    setMessage({
      type: 'success',
      text: 'Language preference updated!'
    });

    // Clear message after a few seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 3000);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // In a real app, you would call an API to delete the account
    // For now, just simulate the process
    setShowDeleteModal(false);
    logout();
    router.push('/register');
  };

  // Show skeleton while loading
  if (authLoading || isLoading) {
    return <SettingsSkeletonLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'general'}
            icon={<Settings className="h-4 w-4" />}
            onClick={() => setActiveTab('general')}
          >
            General
          </TabButton>

          <TabButton
            active={activeTab === 'notifications'}
            icon={<Bell className="h-4 w-4" />}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </TabButton>

          <TabButton
            active={activeTab === 'privacy'}
            icon={<Lock className="h-4 w-4" />}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy
          </TabButton>

          <TabButton
            active={activeTab === 'appearance'}
            icon={settings.appearance.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </TabButton>
        </div>

        {/* Success/Error message */}
        {message.text && (
          <div className={`mb-6 p-3 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <Check className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {message.text}
            </div>
          </div>
        )}

        {/* Settings panel */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* General Settings */}
          {activeTab === 'general' && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                General Settings
              </h2>

              <div className="space-y-6">
                <div className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">Account Information</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Email: {user?.email || 'Not available'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Member since: {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Unknown'
                    }
                  </p>
                </div>

                <div className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">Email Preferences</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Manage how we contact you via email
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Change email preferences
                  </button>
                </div>

                <div className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">Connected Accounts</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Connect your account to other services
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                      Google
                    </button>
                    <button className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                      Facebook
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Notification Settings
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Email Alerts</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Receive email notifications about new messages
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.emailAlerts}
                    onChange={() => handleToggle('notifications', 'emailAlerts')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Message Notifications</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Receive notifications when you get new messages
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.messageNotifications}
                    onChange={() => handleToggle('notifications', 'messageNotifications')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Property Updates</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Get notified about changes to properties you're interested in
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.propertyUpdates}
                    onChange={() => handleToggle('notifications', 'propertyUpdates')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Marketing Emails</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Receive promotional emails and special offers
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.notifications.marketingEmails}
                    onChange={() => handleToggle('notifications', 'marketingEmails')}
                  />
                </div>
              </div>
            </>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Privacy Settings
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Profile Visibility</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Allow your profile to be visible to others
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.showProfile}
                    onChange={() => handleToggle('privacy', 'showProfile')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Contact Information</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Show your contact information to other users
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.showContactInfo}
                    onChange={() => handleToggle('privacy', 'showContactInfo')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Activity Tracking</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Allow us to collect data on how you use the platform
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.privacy.activityTracking}
                    onChange={() => handleToggle('privacy', 'activityTracking')}
                  />
                </div>
              </div>
            </>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Appearance Settings
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      {settings.appearance.darkMode ? (
                        <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Dark Mode</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Toggle between light and dark theme
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch
                    enabled={settings.appearance.darkMode}
                    onChange={() => handleToggle('appearance', 'darkMode')}
                  />
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                      <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">Language</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Select your preferred language
                      </p>
                    </div>
                  </div>
                  <select
                    value={settings.appearance.language}
                    onChange={handleLanguageChange}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                    <option value="marathi">Marathi</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </MotionDiv>

        {/* Danger Zone */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-6">
            Danger Zone
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                  <LogOut className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Log Out</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Log out from your account on this device
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none"
              >
                Log Out
              </button>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center mr-3">
                  <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">Delete Account</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Permanently delete your account and all data
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/50 focus:outline-none"
              >
                Delete Account
              </button>
            </div>
          </div>
        </MotionDiv>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Delete Account
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
