"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Shipment {
  trackingId: string;
  commodity: string;
  deliverySource: string;
  deliveryDestination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: string;
  payment: number;
  status: string;
}

export default function ShipmentTable() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch only confirmed shipments (In-Transit)
  const fetchShipments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/bookings/status/CONFIRMED"
      );

      console.log("Confirmed shipments:", res.data);

      // 🔹 Map API booking data to Shipment table format
      const formattedShipments = res.data.map((b: any) => ({
        trackingId: `SHIP-${b.id}`,
        commodity: b.goodsDescription,
        deliverySource: b.pickupAddress,
        deliveryDestination: b.dropAddress,
        pickupDate: b.pickupDate,
        deliveryDate: b.expectDeliveryDate,
        weight: `${b.capacity} Tons`,
        payment: b.estimatedCost,
        status: "Running", // since CONFIRMED means In Transit
      }));

      setShipments(formattedShipments);
    } catch (err) {
      console.error("Error fetching shipments:", err);
      setError("Failed to load shipments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-zinc-600">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Tracking Orders (In Transit)
      </h2>

      {loading ? (
        <p className="text-gray-800">Loading shipments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : shipments.length === 0 ? (
        <p className="text-gray-800">No shipments currently in transit.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-800 dark:text-gray-300 uppercase border-b border-gray-200 dark:border-zinc-600 text-xs">
                <th className="py-3 px-2">Track ID</th>
                <th className="px-2">Commodity</th>
                <th className="px-2">Source</th>
                <th className="px-2">Destination</th>
                <th className="px-2">Pickup Date</th>
                <th className="px-2">Delivery Date</th>
                <th className="px-2">Weight</th>
                <th className="px-2">Payment</th>
                <th className="px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 dark:border-zinc-600 hover:bg-purple-400 dark:bg-card transition-colors"
                >
                  <td className="py-3 px-2 font-semibold text-gray-900 dark:text-white">
                    {shipment.trackingId}
                  </td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.commodity}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.deliverySource}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.deliveryDestination}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.pickupDate}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.deliveryDate}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.weight}</td>
                  <td className="px-2 text-gray-900 dark:text-white">{shipment.payment}</td>
                  <td className="px-2 text-gray-900 dark:text-white">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        shipment.status === "Running"
                          ? "bg-yellow-600 text-white"
                          : "bg-green-600"
                      }`}
                    >
                      {shipment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
