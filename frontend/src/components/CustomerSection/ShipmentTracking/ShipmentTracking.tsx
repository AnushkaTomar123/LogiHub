"use client";

import { useEffect, useState } from "react";
import { FaSearchLocation, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ShipmentTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("sidebarCollapsed") === "true";
      }
      return false;
    });
  
    useEffect(() => {
      const updateSidebar = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      };
      window.addEventListener("storage", updateSidebar);
      return () => window.removeEventListener("storage", updateSidebar);
    }, []);
  
    const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const handleTrack = () => {
    setError("");
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID.");
      setTrackingData(null);
      return;
    }

    // 🔹 Dummy tracking data for demo
    if (trackingId === "LOGI123") {
      setTrackingData({
        id: "LOGI123",
        status: "In Transit",
        currentLocation: "Indore, MP",
        destination: "Kanpur, UP",
        expectedDelivery: "15 Nov 2025",
      });
    } else if (trackingId === "LOGI456") {
      setTrackingData({
        id: "LOGI456",
        status: "Delivered",
        currentLocation: "Kanpur, UP",
        destination: "Kanpur, UP",
        expectedDelivery: "10 Nov 2025",
      });
    } else {
      setTrackingData(null);
      setError("No shipment found with this tracking ID.");
    }
  };

  return (
    <div style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="flex flex-col flex-1 bg-gray-900 text-white p-6 rounded-2xl shadow-md transition-all duration-300">

    
      <h1 className="text-2xl font-semibold mb-6">📦 Shipment Tracking</h1>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID..."
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white outline-none border border-gray-700 focus:ring-2 focus:ring-violet-400"
        />
        <button
          onClick={handleTrack}
          className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-md font-medium flex items-center gap-2"
        >
          <FaSearchLocation />
          Track
        </button>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {/* Result Section */}
      {trackingData && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <div className="flex flex-col gap-2">
            <p><strong>Tracking ID:</strong> {trackingData.id}</p>
            <p><strong>Status:</strong> {trackingData.status}</p>
            <p><strong>Current Location:</strong> {trackingData.currentLocation}</p>
            <p><strong>Destination:</strong> {trackingData.destination}</p>
            <p><strong>Expected Delivery:</strong> {trackingData.expectedDelivery}</p>
          </div>

          <div className="mt-5 flex items-center gap-4">
            {trackingData.status === "Delivered" ? (
              <FaCheckCircle className="text-green-500 text-3xl" />
            ) : trackingData.status === "In Transit" ? (
              <FaTruck className="text-yellow-400 text-3xl" />
            ) : (
              <FaTimesCircle className="text-red-500 text-3xl" />
            )}
            <span className="text-gray-400">Tracking status updated</span>
          </div>
        </div>
      )}
    </div>
  );
}
