"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransporterHeader from "../../../components/TransporterSection/TransporterHeader";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaWallet, FaBell, FaCog, FaUser } from "react-icons/fa";

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

  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [showWalletForm, setShowWalletForm] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);

  
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
  

 
  const router = useRouter();

  // 🔄 Handle notification & preference toggle
  const handleNotificationChange = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handlePreferenceChange = (field: string) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  

  

  // 💡 Navigate to profile info
  const handleProfileRedirect = () => {
    router.push("/transporter/profile");
  };

  return (
    <div  style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="min-h-screen bg-gray-100 dark:bg-background transition-all duration-300">
      {/* Header */}
      <TransporterHeader />

      <div className="p-6 mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2"
        >
          <FaCog className="text-violet-500" /> Settings
        </motion.h2>

        {/* Change Profile Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleProfileRedirect}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-md"
          >
            <FaUser /> Change Profile
          </button>
        </div>

        {/* Notifications */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-card shadow-lg rounded-xl p-6 mb-6 transition-all"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaBell className="text-violet-500" /> Notifications
          </h3>
          <div className="space-y-3">
            {Object.keys(notifications).map((key) => (
              <label key={key} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={() => handleNotificationChange(key)}
                  className="w-4 h-4 accent-violet-600"
                />
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-card shadow-lg rounded-xl p-6 mb-6 transition-all"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaCog className="text-violet-500" /> Preferences
          </h3>
          <div className="space-y-3">
            {Object.keys(preferences).map((key) => (
              <label key={key} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={preferences[key as keyof typeof preferences]}
                  onChange={() => handlePreferenceChange(key)}
                  className="w-4 h-4 accent-violet-600"
                />
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </motion.div>

       

        {/* Other Settings */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white dark:bg-card shadow-lg rounded-xl p-6 transition-all"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <FaCog className="text-violet-400" /> Other Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              Manage API Keys
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              App Preferences
            </button>
          </div>
        </motion.div>

        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </div>
  );
}
