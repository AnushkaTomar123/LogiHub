"use client";

import { useState, useEffect } from "react";
import {
  FaTruckLoading,
  FaAngleRight,
  FaBox,
  FaShippingFast,
  FaRupeeSign,
  FaSpinner,
  FaTimes,
  FaCalendarAlt,
  FaWeightHanging,
} from "react-icons/fa";
import axios from "axios";
import TransporterHeader from "@/components/transporter/TransporterHeader";

type Booking = {
  capacity: number;
  pickupDate: string;
  id: number;
  pickupAddress: string;
  dropAddress: string;
  expectDeliveryDate: string;
  goodsDescription: string;
  estimatedCost: number;
  vehicalType: string;
  bookingStatus: string;
};

// ✅ Booking card
const BookingCard: React.FC<{
  booking: Booking;
  onView: (b: Booking) => void;
  onAccept: (id: number) => void;
}> = ({ booking, onView, onAccept }) => {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const handlePlaceBid = async () => {
    if (!bidAmount) return alert("Please enter your bid amount");
    try {
      await axios.post(`http://localhost:8080/api/bids/place`, {
        bookingId: booking.id,
        bidAmount,
      });
      alert("Bid placed successfully!");
      setShowBidForm(false);
    } catch (err) {
      console.error("Error placing bid:", err);
      alert("Failed to place bid");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-background rounded-2xl p-5 border border-gray-300 dark:border-gray-700 shadow-lg hover:shadow-violet-500/20 transition-all duration-300 text-gray-900 dark:text-gray-100 flex flex-col justify-between">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
        Load ID: {booking.id}
      </p>

      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center text-gray-800 dark:text-white">
          {booking.pickupAddress}
          <FaAngleRight className="mx-2 text-violet-500" />
          {booking.dropAddress}
        </h3>

        <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
          <FaBox className="text-violet-400" /> Commodity:
          <span className="font-medium">{booking.goodsDescription}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
          <FaTruckLoading className="text-violet-400" /> Vehicle:
          <span className="font-medium">{booking.vehicalType}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
          <FaCalendarAlt className="text-violet-400" /> Pickup Date:
          <span className="font-medium">{booking.pickupDate}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-400 mb-2 flex items-center gap-2">
          <FaWeightHanging className="text-violet-400" /> Capacity:
          <span className="font-medium">{booking.capacity}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-400 flex items-center gap-2">
          <FaShippingFast className="text-violet-400" /> Expected Delivery:
          <span className="font-medium">{booking.expectDeliveryDate}</span>
        </p>

        <p className="text-gray-700 dark:text-gray-400 flex items-center gap-2">
          <FaRupeeSign className="mr-1" />
          <span>{booking.estimatedCost?.toLocaleString("en-IN")}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => onView(booking)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-semibold transition"
          >
            View
          </button>
          <button
            onClick={() => onAccept(booking.id)}
            className="px-4 py-2 border border-gray-500 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Accept Load
          </button>
          <button
            onClick={() => setShowBidForm(true)}
            className="px-4 py-2 bg-violet-100 text-violet-700 dark:bg-violet-800 dark:text-violet-300 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-700 font-semibold transition"
          >
            Place Bid
          </button>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-6">
          <div className="bg-white dark:bg-background rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-violet-600 dark:text-violet-400">
              Place Your Bid
            </h2>
            <input
              type="number"
              placeholder="Enter your bid amount"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBidForm(false)}
                className="px-4 py-2 border border-gray-400 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceBid}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-semibold transition"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// ✅ Main Component
export default function FreightManagementPage() {
  const [status, setStatus] = useState("PENDING");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCity, setLoadingCity] = useState("");
  const [unloadingCity, setUnloadingCity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [commodity, setCommodity] = useState("");

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const filteredBookings = bookings
  .filter((b) =>
    (!loadingCity || b.pickupAddress.toLowerCase().includes(loadingCity.toLowerCase())) &&
    (!unloadingCity || b.dropAddress.toLowerCase().includes(unloadingCity.toLowerCase())) &&
    (!vehicleType || b.vehicalType.toLowerCase().includes(vehicleType.toLowerCase())) &&
    (!commodity || b.goodsDescription.toLowerCase().includes(commodity.toLowerCase()))
  ); // show max 10 loads


  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);
    const initial = localStorage.getItem("sidebarCollapsed") === "true";
    setSidebarCollapsed(initial);

    const handleStorageChange = () => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<Booking[]>(
          `http://localhost:8080/api/bookings/status/${status}`
        );
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed fetching bookings:", err);
        setError("Failed to load loads. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [mounted, status]);

  // ✅ Accept Load API
  const handleAccept = async (bookingId: number) => {
    const transporterId = localStorage.getItem("transporterId");
    if (!transporterId) {
      alert("Transporter not logged in!");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/bookings/${bookingId}/accept/${transporterId}`
      );
      alert("Load accepted successfully!");

      const res = await axios.get<Booking[]>(
        `http://localhost:8080/api/bookings/status/${status}`
      );
      setBookings(res.data || []);
    } catch (err) {
      console.error("Error accepting booking:", err);
      alert("Failed to accept load. Try again.");
    }
  };

  if (!mounted) return null;

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen bg-white dark:bg-background text-gray-100"
    >
      <TransporterHeader />
      <div className="p-6">
        {/* 🔘 STATUS FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          {["PENDING", "ACCEPTED", "IN_TRANSIT", "DELIVERED"].map((s) => (
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

        {/* 🔍 Search + City Select */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-3">Search Load</h2>
          <div className="flex gap-3 items-center">
            <input
              placeholder="Select Loading City"
              value={loadingCity}
              onChange={(e) => setLoadingCity(e.target.value)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none w-64"
            />
            <input
              placeholder="Select Unloading City"
              value={unloadingCity}
              onChange={(e) => setUnloadingCity(e.target.value)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none w-64"
            />
            <input
              placeholder="Select vehicle type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none w-64"
            />
            <input
              placeholder="Select Commodity "
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-card border border-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none w-64"
            />
          </div>
        </div>

        {/* 🧩 Main Layout */}
        <div className="flex gap-6">
          {/* Main Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-60 text-gray-400">
                <FaSpinner className="animate-spin mr-2" /> Loading loads...
              </div>
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : bookings.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                No loads available
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* 🪟 Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50 p-6 pt-20">
            <div className="bg-gray-200 dark:bg-card rounded-xl shadow-2xl w-full max-w-3xl text-gray-100">
              <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-[#3C3D3F] rounded-t-xl">
                <h2 className="text-2xl font-bold text-violet-400">
                  Booking Details (ID: {selectedBooking.id})
                </h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center p-4 bg-[#3C3D3F] rounded-lg">
                  <div>
                    <p className="text-base font-semibold text-gray-400">
                      Route:
                    </p>
                    <p className="text-xl font-extrabold text-white">
                      {selectedBooking.pickupAddress}{" "}
                      <FaAngleRight className="inline mx-1 text-violet-400" />{" "}
                      {selectedBooking.dropAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-400">Cost:</p>
                    <p className="text-2xl font-bold text-green-400 flex items-center justify-end">
                      <FaRupeeSign className="w-4 h-4" />
                      {selectedBooking.estimatedCost?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F]">
                    <p className="font-semibold text-gray-400 flex items-center gap-1">
                      <FaBox className="text-violet-400" /> Goods Description:
                    </p>
                    <p className="font-bold text-white">
                      {selectedBooking.goodsDescription}
                    </p>
                  </div>
                  <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F]">
                    <p className="font-semibold text-gray-400 flex items-center gap-1">
                      <FaTruckLoading className="text-violet-400" /> Vehicle
                      Type:
                    </p>
                    <p className="font-bold text-white">
                      {selectedBooking.vehicalType}
                    </p>
                  </div>
                  <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F] col-span-2">
                    <p className="font-semibold text-gray-400 flex items-center gap-1">
                      <FaShippingFast className="text-violet-400" /> Expected
                      Delivery:
                    </p>
                    <p className="font-bold text-white">
                      {selectedBooking.expectDeliveryDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#3C3D3F] rounded-b-xl flex justify-end gap-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-6 py-3 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
