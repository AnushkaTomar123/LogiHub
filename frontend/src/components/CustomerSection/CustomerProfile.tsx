"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Customer {
  username: string;
  email: string;
  role: string;
}

type ProfileSection = "info" | "documents" | "settings";

export default function CustomerProfilePage() {
  const [Customer, setCustomer] = useState<Customer | null>(null);
  const [activeSection, setActiveSection] = useState<ProfileSection>("info");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("sidebarCollapsed") === "true";
    return false;
  });

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  useEffect(() => {
    const handler = () => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) {
      setCustomer({ username, email, role });
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out flex flex-col p-4"
        style={{ width: sidebarWidth }}
      >
        {/* Profile Avatar */}
        <div className="flex flex-col items-center gap-3 mb-6 mt-6">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {Customer ? Customer.username.charAt(0) : "T"}
          </div>
          {!sidebarCollapsed && (
            <>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {Customer?.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {Customer?.email}
              </p>
            </>
          )}
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-2 mt-4">
          {["info", "documents", "settings"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as ProfileSection)}
              className={`text-left px-4 py-2 rounded-lg font-medium ${
                activeSection === section
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {!sidebarCollapsed &&
                (section === "info"
                  ? "Profile Information"
                  : section === "documents"
                  ? "Document Upload"
                  : "Settings")}
            </button>
          ))}

          {!sidebarCollapsed && (
            <Link
              href="/auth/login"
              className="text-left px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Logout
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Customer Profile
          </h1>
          <button
            onClick={() => {
              const newState = !sidebarCollapsed;
              setSidebarCollapsed(newState);
              localStorage.setItem("sidebarCollapsed", String(newState));
            }}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            {sidebarCollapsed ? "Expand" : "Collapse"}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {activeSection === "info" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Profile Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Name: {Customer?.username}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Email: {Customer?.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Role: {Customer?.role}
              </p>
            </div>
          )}

          {activeSection === "documents" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Document Upload
              </h2>
              <input
                type="file"
                className="mt-2 block border p-2 rounded w-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Settings
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Change your account settings here.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
