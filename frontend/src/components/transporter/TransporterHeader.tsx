"use client";

import { useState, useEffect } from "react";
import {
  MdNotifications,
  MdDarkMode,
  MdLightMode,
  MdSearch,
} from "react-icons/md";
import Link from "next/link";

interface Transporter {
  username: string;
  email: string;
  role: string;
}

export default function TransporterHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [transporter, setTransporter] = useState<Transporter | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) setTransporter({ username, email, role });
  }, []);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow flex justify-between items-center px-4 py-3 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            <MdNotifications size={24} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-700 shadow-lg rounded-md p-3 z-50">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* Dark/Light Mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
        </button>

        {/* Profile */}
        <div className="relative">
          {/* Profile Panel */}
          {/* Profile Icon - Click to Go to Profile Page */}
          <Link
            href="/transporter/profile"
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {transporter ? transporter.username.charAt(0) : "T"}
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {transporter ? transporter.username : "Transporter"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
