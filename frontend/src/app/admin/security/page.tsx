"use client";

import { useState, useEffect, FormEvent } from "react";
import { MdPerson, MdEmail, MdLock, MdNotifications, MdPalette, MdLogout } from "react-icons/md";

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
    // Save to localStorage as dummy action
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    alert("Profile updated successfully!");
    setUser({ ...user!, username, email });
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return alert("Fill all fields!");
    alert("Password changed successfully! (Dummy)");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.href = "/auth/login"; // redirect to login
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2 mb-6">
        <MdPerson className="w-5 h-5 text-blue-500" />
        <span>Settings</span>
      </h2>

      {/* Profile Settings */}
      <form onSubmit={handleProfileUpdate} className="mb-6 space-y-4">
        <h3 className="font-semibold text-slate-700 mb-2">Profile</h3>
        <div className="flex items-center space-x-3">
          <MdPerson className="w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center space-x-3">
          <MdEmail className="w-5 h-5 text-slate-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          Update Profile
        </button>
      </form>

      {/* Password Change */}
      <form onSubmit={handlePasswordChange} className="mb-6 space-y-4">
        <h3 className="font-semibold text-slate-700 mb-2">Change Password</h3>
        <div className="flex items-center space-x-3">
          <MdLock className="w-5 h-5 text-slate-500" />
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center space-x-3">
          <MdLock className="w-5 h-5 text-slate-500" />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          Change Password
        </button>
      </form>

      {/* Preferences */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-700 mb-2">Preferences</h3>
        <div className="flex items-center space-x-3 mb-2">
          <MdNotifications className="w-5 h-5 text-slate-500" />
          <label className="flex items-center space-x-2">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 accent-blue-500"
            />
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <MdPalette className="w-5 h-5 text-slate-500" />
          <label className="flex items-center space-x-2">
            <span>Dark Theme</span>
            <input
              type="checkbox"
              checked={darkTheme}
              onChange={() => setDarkTheme(!darkTheme)}
              className="w-5 h-5 accent-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
      >
        <MdLogout className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </section>
  );
};

export default AdminSettingsSection;
