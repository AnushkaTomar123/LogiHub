"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaTruckLoading } from "react-icons/fa";

interface Booking {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  pickupDate: string;
  deliveryDate: string;
  estimatedDistanceKm: number;
  estimatedCost: number;
}

export default function MyOrdersPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const customerId = localStorage.getItem("customerId"); // customer login ID
        if (!customerId) {
          alert("Customer not logged in!");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/bookings/customer/${customerId}`
        );

        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch your bookings!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl text-gray-600">
        <FaTruckLoading className="animate-spin mr-2" /> Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-10 text-center text-gray-700">
        You have not made any bookings yet.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-5 rounded-xl shadow border border-gray-200"
          >
            <p className="font-semibold text-gray-600">Pickup:</p>
            <p className="text-gray-900 mb-2">{booking.pickupAddress}</p>

            <p className="font-semibold text-gray-600">Drop:</p>
            <p className="text-gray-900 mb-2">{booking.dropAddress}</p>

            <p className="font-semibold text-gray-600">Pickup Date:</p>
            <p className="text-gray-900 mb-2">{booking.pickupDate.split("T")[0]}</p>

            <p className="font-semibold text-gray-600">Delivery Date:</p>
            <p className="text-gray-900 mb-2">{booking.deliveryDate.split("T")[0]}</p>

            <p className="font-semibold text-gray-600">Distance (km):</p>
            <p className="text-gray-900 mb-2">{booking.estimatedDistanceKm}</p>

            <p className="font-semibold text-gray-600">Fare (₹):</p>
            <p className="text-gray-900 mb-2">{booking.estimatedCost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
