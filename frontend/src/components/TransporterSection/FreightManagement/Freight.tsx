"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import TransporterHeader from "@/components/TransporterSection/TransporterHeader";
import BookingCard from "./BookingCard";
import BookingDetailsModal from "./BookingDetailsModal";

type Booking = {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  goodsDescription: string;
  vehicalType: string;
  pickupDate: string;
  expectDeliveryDate: string;
  capacity: number;
  estimatedCost: number;
  status: string;
  transporterId?: number;
  driverId?: number;
  vehicleId?: number;
};

export default function FreightManagementPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [loadingCity, setLoadingCity] = useState("");
  const [unloadingCity, setUnloadingCity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [commodity, setCommodity] = useState("");

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

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/bookings/status/${status}`
      );
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load loads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [status]);

  const handleAccept = async (bookingId: number) => {
    const transporterId = localStorage.getItem("transporterId");
    if (!transporterId) return alert("Transporter not logged in!");

    try {
      await axios.post(
        `http://localhost:8080/api/bookings/${bookingId}/confirm/${transporterId}`
      );
      alert("Booking accepted successfully!");
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("Failed to accept booking");
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      (!loadingCity ||
        b.pickupAddress.toLowerCase().includes(loadingCity.toLowerCase())) &&
      (!unloadingCity ||
        b.dropAddress.toLowerCase().includes(unloadingCity.toLowerCase())) &&
      (!vehicleType ||
        b.vehicalType.toLowerCase().includes(vehicleType.toLowerCase())) &&
      (!commodity ||
        b.goodsDescription.toLowerCase().includes(commodity.toLowerCase()))
  );

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen bg-white dark:bg-background text-gray-100"
    >
      <TransporterHeader />

      <div className="p-6">
        {/* 🔘 Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Freight Management
          </h1>
        </div>

        {/* 🔘 Status Tabs */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["PENDING", "AWAITING_PAYMENT", "ACCEPTED", "CONFIRMED", "DELIVERED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                status === s
                  ? "bg-violet-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* 🔍 Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <input
            placeholder="Loading City"
            value={loadingCity}
            onChange={(e) => setLoadingCity(e.target.value)}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none w-60"
          />
          <input
            placeholder="Unloading City"
            value={unloadingCity}
            onChange={(e) => setUnloadingCity(e.target.value)}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none w-60"
          />
          <input
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none w-60"
          />
          <input
            placeholder="Commodity"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none w-60"
          />
        </div>

        {/* 🧩 Loads Display */}
        {loading ? (
          <div className="flex justify-center items-center h-60 text-gray-400">
            <FaSpinner className="animate-spin mr-2" /> Loading loads...
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : filteredBookings.length === 0 ? (
          <p className="text-center text-gray-400">No loads available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onView={setSelectedBooking}
                onAccept={handleAccept}
              />
            ))}
          </div>
        )}

        {/* 🪟 Booking Details Modal */}
        {selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </div>
  );
}
