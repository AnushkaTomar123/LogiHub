"use client";

import AdminHeader from "@/components/AdminSection/AdminHeader";
import { useState, useEffect, FormEvent } from "react";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdNotifications,
  MdPalette,
  MdLogout,
} from "react-icons/md";

interface User {
  username: string;
  email: string;
  role: string;
}

const AdminSettingsSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username") || "Admin";
    const savedEmail = localStorage.getItem("email") || "admin@example.com";
    const savedRole = localStorage.getItem("role") || "Admin";
    setUser({ username: savedUsername, email: savedEmail, role: savedRole });
    setUsername(savedUsername);
    setEmail(savedEmail);
  }, []);

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !email) return alert("Username and Email cannot be empty!");
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    alert("Profile updated successfully!");
    setUser({ ...user!, username, email });
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword)
      return alert("Please fill all password fields!");
    alert("Password changed successfully! (Dummy)");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background text-gray-900 dark:text-gray-100 transition-all duration-300">
      <AdminHeader />

      <section className="mx-auto bg-white dark:bg-card rounded-sm shadow-xl max-w-308  mt-2 p-8">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-8">
          <MdPerson className="text-blue-500" />
          Settings
        </h2>

        {/* Profile Settings */}
        <form
          onSubmit={handleProfileUpdate}
          className="mb-10 space-y-4 border-b border-gray-300 dark:border-gray-700 pb-6"
        >
          <h3 className="font-semibold text-lg mb-2 text-blue-600 dark:text-blue-400">
            Profile Information
          </h3>
          <div className="flex items-center gap-3">
            <MdPerson className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-gray-50 dark:bg-background p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-gray-50 dark:bg-background p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Update Profile
          </button>
        </form>

        {/* Password Change */}
        <form
          onSubmit={handlePasswordChange}
          className="mb-10 space-y-4 border-b border-gray-300 dark:border-gray-700 pb-6"
        >
          <h3 className="font-semibold text-lg mb-2 text-green-600 dark:text-green-400">
            Change Password
          </h3>
          <div className="flex items-center gap-3">
            <MdLock className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full bg-gray-50 dark:bg-background p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <MdLock className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full bg-gray-50 dark:bg-background p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            Change Password
          </button>
        </form>

        {/* Preferences */}
        <div className="mb-10 space-y-3 border-b border-gray-300 dark:border-gray-700 pb-6">
          <h3 className="font-semibold text-lg mb-2 text-purple-600 dark:text-purple-400">
            Preferences
          </h3>
          <div className="flex items-center gap-3">
            <MdNotifications className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <label className="flex items-center gap-2">
              <span>Enable Notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-blue-500"
              />
            </label>
          </div>
          <div className="flex items-center gap-3">
            <MdPalette className="text-gray-500 dark:text-gray-300 w-5 h-5" />
            <label className="flex items-center gap-2">
              <span>Dark Theme</span>
              <input
                type="checkbox"
                checked={darkTheme}
                onChange={() => setDarkTheme(!darkTheme)}
                className="w-5 h-5 accent-purple-500"
              />
            </label>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
        >
          <MdLogout className="w-5 h-5" />
          Logout
        </button>
      </section>
    </div>
  );
};

export default AdminSettingsSection;
