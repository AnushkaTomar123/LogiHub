"use client";

import { useState } from "react";
import { FaLock, FaBell, FaPalette, FaSave } from "react-icons/fa";

export default function CustomerSettings() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("dark");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-all duration-300 p-6 sm:ml-64">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 space-y-6">
        
        {/* Password Section */}
        <div>
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            <FaLock className="text-purple-500 mr-2" /> Password Settings
          </h2>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        {/* Notification Toggle */}
        <div>
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            <FaBell className="text-purple-500 mr-2" /> Notifications
          </h2>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-purple-600"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Enable Email Notifications
            </span>
          </label>
        </div>

        {/* Theme Selection */}
        <div>
          <h2 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            <FaPalette className="text-purple-500 mr-2" /> Theme Preference
          </h2>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition flex justify-center items-center gap-2"
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
