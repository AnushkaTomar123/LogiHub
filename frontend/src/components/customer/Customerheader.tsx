"use client";

import { useState, useEffect } from "react";
import { MdNotifications, MdDarkMode, MdLightMode, MdSearch } from "react-icons/md";
import Link from "next/link";

interface Customer {
  username: string;
  email: string;
  role: string;
}

export default function CustomerHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [Customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) setCustomer({ username, email, role });
  }, []);

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow flex justify-between items-center px-4 py-3 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" size={20} />
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
              <p className="text-sm text-gray-700 dark:text-gray-200">No new notifications</p>
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
          <button
            onClick={() => setShowProfilePanel(!showProfilePanel)}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {Customer ? Customer.username.charAt(0) : "T"}
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              {Customer ? Customer.username : "Customer"}
            </span>
          </button>

          {/* Profile Panel */}
          {showProfilePanel && (
            <div className="absolute right-0 top-full mt-2 w-96 h-[500px] bg-white dark:bg-gray-700 shadow-xl rounded-md overflow-y-auto z-50 p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {Customer ? Customer.username.charAt(0) : "T"}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{Customer?.username}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{Customer?.email}</p>
                  <p className="text-sm text-gray-400 dark:text-gray-400">{Customer?.role}</p>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-600" />

              {/* Options */}
              <div className="flex flex-col gap-2">
                <Link href="/Customer/profile/info" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  Profile Information
                </Link>
                <Link href="/Customer/profile/documents" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  Document Upload
                </Link>
                <Link href="/Customer/settings" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  Settings
                </Link>
                <Link href="/auth/login" className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  Logout
                </Link>
              </div>

              {/* Optional: Detailed Panel Right Side */}
              <div className="mt-auto text-gray-500 text-sm">
                Customer Panel - LogiHub
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
