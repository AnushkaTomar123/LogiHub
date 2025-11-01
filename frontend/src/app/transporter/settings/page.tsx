"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const transporterId = localStorage.getItem("transporterId"); // assume saved at login

  const handleNotificationChange = (field: string) => {
    setNotifications({ ...notifications, [field]: !notifications[field as keyof typeof notifications] });
  };

  const handlePreferenceChange = (field: string) => {
    setPreferences({ ...preferences, [field]: !preferences[field as keyof typeof preferences] });
  };

  const fetchWallet = async () => {
    if (!transporterId) return;
    try {
      setLoadingWallet(true);
      const res = await axios.get(`http://localhost:8080/api/wallets/TRANSPORTER/${transporterId}`);
      setWalletBalance(res.data.balance);
    } catch (err) {
      console.log("Wallet not found, create one.");
      setWalletBalance(null);
    } finally {
      setLoadingWallet(false);
    }
  };

  const createWallet = async () => {
    if (!transporterId) return;
    try {
      setLoadingWallet(true);
      const res = await axios.post(
        `http://localhost:8080/api/wallets/create`,
        null,
        { params: { ownerId: transporterId, ownerType: "TRANSPORTER" } }
      );
      toast.success("Wallet created successfully!");
      setWalletBalance(res.data.balance);
      setShowWalletForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create wallet!");
    } finally {
      setLoadingWallet(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Transporter Settings</h2>

      {/* Notifications */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Notifications</h3>
        <div className="space-y-3">
          {Object.keys(notifications).map((key) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications[key as keyof typeof notifications]}
                onChange={() => handleNotificationChange(key)}
                className="w-4 h-4"
              />
              <span>{key.replace(/([A-Z])/g, " $1")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Preferences</h3>
        <div className="space-y-3">
          {Object.keys(preferences).map((key) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={preferences[key as keyof typeof preferences]}
                onChange={() => handlePreferenceChange(key)}
                className="w-4 h-4"
              />
              <span>{key.replace(/([A-Z])/g, " $1")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Wallet Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Wallet</h3>

        {walletBalance !== null ? (
          <p className="mb-3">Current Balance: <span className="font-semibold">₹{walletBalance}</span></p>
        ) : (
          <p className="mb-3 text-red-500">No wallet found</p>
        )}

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowWalletForm(!showWalletForm)}
        >
          {walletBalance === null ? "Add Wallet" : "Update Wallet"}
        </button>

        {showWalletForm && walletBalance === null && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <p>Click below to create your wallet with ₹10,000 starting balance.</p>
            <button
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={createWallet}
              disabled={loadingWallet}
            >
              {loadingWallet ? "Creating..." : "Create Wallet"}
            </button>
          </div>
        )}
      </div>

      {/* Other Settings */}
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

      <ToastContainer />
    </div>
  );
}
