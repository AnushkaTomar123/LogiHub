"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Transporter {
  username: string;
  email: string;
  role: string;
}

type ProfileSection = "info" | "documents" | "settings";

export default function TransporterProfilePage() {
  const [transporter, setTransporter] = useState<Transporter | null>(null);
  const [activeSection, setActiveSection] = useState<ProfileSection>("info");

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) {
      setTransporter({ username, email, role });
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-700 shadow-md flex flex-col p-6">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {transporter ? transporter.username.charAt(0) : "T"}
          </div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{transporter?.username}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{transporter?.email}</p>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => setActiveSection("info")}
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "info" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveSection("documents")}
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "documents" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Document Upload
          </button>
          <button
            onClick={() => setActiveSection("settings")}
            className={`text-left px-4 py-2 rounded-lg font-medium ${
              activeSection === "settings" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Settings
          </button>
          <Link
            href="/auth/login"
            className="text-left px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === "info" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Profile Information</h2>
            <p className="text-gray-700 dark:text-gray-300">Name: {transporter?.username}</p>
            <p className="text-gray-700 dark:text-gray-300">Email: {transporter?.email}</p>
            <p className="text-gray-700 dark:text-gray-300">Role: {transporter?.role}</p>
            {/* Add more profile info fields if needed */}
          </div>
        )}

        {activeSection === "documents" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Document Upload</h2>
            <p className="text-gray-700 dark:text-gray-300">Upload your documents here.</p>
            <input type="file" className="mt-2 block border p-2 rounded w-full dark:bg-gray-600 dark:text-white" />
          </div>
        )}

        {activeSection === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Settings</h2>
            <p className="text-gray-700 dark:text-gray-300">Change your account settings here.</p>
            {/* Add settings form here */}
          </div>
        )}
      </main>
    </div>
  );
}
