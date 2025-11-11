"use client";

import { useState, useEffect } from "react";
import { MdNotifications, MdSearch } from "react-icons/md";
import Link from "next/link";

interface Admin {
  username: string;
  email: string;
  role: string;
}

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) setAdmin({ username, email, role });
  }, []);

  return (
    <header className="w-full bg-white dark:bg-background border-b border-gray-50 dark:border-zinc-700 shadow flex justify-between items-center px-4 py-3 sticky top-0 z-50">
      {/* 🔹 Desktop Search */}
      <div className="flex-1 max-w-75 hidden md:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-5 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-card text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
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

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-3 md:ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-violet-200 dark:hover:bg-card text-violet-400 dark:text-gray-200"
          >
            <MdNotifications size={24} />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-card shadow-lg rounded-md p-3 z-50">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <Link
            href="/admin/profile"
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-card"
          >
            <div className="w-8 h-8 bg-violet-500 dark:bg-violet-700 rounded-full flex items-center justify-center text-white font-semibold">
              {admin ? admin.username.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline">
              {admin ? admin.username : "Admin"}
            </span>
          </Link>
        </div>
      </div>

      {/* 🔹 Mobile Search Overlay */}
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
