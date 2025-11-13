"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Booking {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  goodsDescription: string;
  vehicleType: string;
  status: string;
}

export default function RecentShipments() {
  const [recentShipments, setRecentShipments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch delivered shipments
  const fetchDeliveredShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/bookings/status/CONFIRMED"
      );
      const data = res.data || [];

      // show only 3 most recent (assuming latest ones come last)
      const latestThree = data.slice(-3).reverse();

      setRecentShipments(latestThree);
    } catch (err) {
      console.error(err);
      setError("Failed to load recent shipments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveredShipments();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-card rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Recent Shipments
        </h2>

        {/* 🔹 "Show More" button */}
        <Link href="/transporter/shipments">
          <button className="text-xs px-2 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition">
            Show More 
          </button>
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {recentShipments.length > 0 ? (
        <div className="space-y-3">
          {recentShipments.slice(0,2).map((shipment) => (
            <div
              key={shipment.id}
              className="p-4 border border-gray-200 dark:border-zinc-700  bg-gray-50 dark:bg-background rounded-lg"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {shipment.pickupAddress} → {shipment.dropAddress}
              </p>
              
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No recent delivered shipments found.</p>
      )}
    </div>
  );
}
