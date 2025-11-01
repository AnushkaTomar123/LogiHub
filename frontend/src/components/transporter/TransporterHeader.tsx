"use client";

import { useState, useEffect } from "react";
import {
  MdNotifications,
  MdSearch,
} from "react-icons/md";
import Link from "next/link";

interface Transporter {
  username: string;
  email: string;
  role: string;
}

export default function TransporterHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [transporter, setTransporter] = useState<Transporter | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // 🔹 For toggling mobile search input

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) setTransporter({ username, email, role });
  }, []);

  return (
    <header className="w-full bg-white dark:bg-background border-b border-gray-800 dark:border-border shadow flex justify-between items-center px-4 py-3 sticky top-0 z-50">
      
      {/* 🔹 Desktop Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-card text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-border"
          />
          <MdSearch
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
            size={20}
          />
        </div>
      </div>

      {/* 🔹 Mobile Search Icon */}
      <div className="flex md:hidden">
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <MdSearch size={24} />
        </button>
      </div>

      {/* 🔹 Right Icons */}
      <div className="flex items-center gap-3 md:ml-6">
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

        {/* Profile */}
        <div className="relative">
          <Link
            href="/transporter/profile"
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center text-white font-semibold">
              {transporter ? transporter.username.charAt(0) : "T"}
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline">
              {transporter ? transporter.username : "Transporter"}
            </span>
          </Link>
        </div>
      </div>

      {/* 🔹 Mobile Search Input Overlay */}
      {showMobileSearch && (
        <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-background flex items-center px-4 shadow-md md:hidden">
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            className="flex-1 pl-4 pr-10 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-card text-gray-800 dark:text-gray-200 focus:outline-none"
          />
          <button
            onClick={() => setShowMobileSearch(false)}
            className="absolute right-5 text-gray-500 dark:text-gray-300"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}
