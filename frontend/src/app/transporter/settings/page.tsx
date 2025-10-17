"use client";

import { useState } from "react";

export default function TransporterSettings() {
  const [notifications, setNotifications] = useState({
    newTrips: true,
    paymentUpdates: true,
    customerMessages: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailAlerts: true,
  });

  const handleNotificationChange = (field: string) => {
    setNotifications({ ...notifications, [field]: !notifications[field as keyof typeof notifications] });
  };

  const handlePreferenceChange = (field: string) => {
    setPreferences({ ...preferences, [field]: !preferences[field as keyof typeof preferences] });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Transporter Settings</h2>

      {/* Notifications Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.newTrips}
              onChange={() => handleNotificationChange("newTrips")}
              className="w-4 h-4"
            />
            <span>New Trip Assignments</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.paymentUpdates}
              onChange={() => handleNotificationChange("paymentUpdates")}
              className="w-4 h-4"
            />
            <span>Payment Updates</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={notifications.customerMessages}
              onChange={() => handleNotificationChange("customerMessages")}
              className="w-4 h-4"
            />
            <span>Customer Messages</span>
          </label>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={() => handlePreferenceChange("darkMode")}
              className="w-4 h-4"
            />
            <span>Dark Mode</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={preferences.emailAlerts}
              onChange={() => handlePreferenceChange("emailAlerts")}
              className="w-4 h-4"
            />
            <span>Email Alerts</span>
          </label>
        </div>
      </div>

      {/* Other Settings Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Other Settings</h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            Manage API Keys
          </button>
          <button className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            App Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
