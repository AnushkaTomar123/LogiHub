"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdPeople,
  MdCurrencyRupee,
  MdOutlineRoute,
  MdCircle,
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";

export default function TransporterDashboard() {
  const [username, setUsername] = useState("Transporter");
  const [transporterId, setTransporterId] = useState<number | null>(null);

  useEffect(() => {
    // Get username from localStorage
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    // Fetch transporter by email and store transporterId
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(`http://localhost:8080/api/transporters/by-email/${storedEmail}`)
        .then((res) => {
          const id = res.data.transporterId;
          setTransporterId(id);
          localStorage.setItem("transporterId", id);
          console.log("✅ Transporter ID fetched successfully:", id);
        })
        .catch((err) =>
          console.error("❌ Error fetching transporter by email:", err)
        );
    }
  }, []);

  const stats = [
    {
      label: "Total Trips",
      value: 124,
      icon: MdOutlineRoute,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Drivers",
      value: 18,
      icon: MdPeople,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Active Vehicles",
      value: 12,
      icon: MdLocalShipping,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Pending Payments",
      value: "₹52,340",
      icon: MdCurrencyRupee,
      color: "bg-red-100 text-red-600",
    },
  ];

  const deliveries = [
    {
      id: "#4521",
      route: "Indore → Bhopal",
      status: "Delivered",
      date: "15 Oct 2025",
    },
    {
      id: "#4522",
      route: "Delhi → Jaipur",
      status: "In Transit",
      date: "15 Oct 2025",
    },
    {
      id: "#4523",
      route: "Pune → Mumbai",
      status: "Delayed",
      date: "14 Oct 2025",
    },
    {
      id: "#4524",
      route: "Lucknow → Kanpur",
      status: "Delivered",
      date: "14 Oct 2025",
    },
  ];

  const drivers = [
    { name: "Rahul Sharma", status: "Online" },
    { name: "Amit Verma", status: "Offline" },
    { name: "Suresh Yadav", status: "Online" },
    { name: "Vikram Singh", status: "Offline" },
  ];

  return (
    <div className="space-y-8">
      <TransporterHeader />

      {/* Header */}
      <div className="flex justify-between items-center px-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {username} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here’s your operational overview today.
          </p>
          {transporterId && (
            <p className="text-sm text-gray-400 mt-1">
              Transporter ID: <span className="font-medium">{transporterId}</span>
            </p>
          )}
        </div>
        <p className="text-gray-500 text-sm">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
              </div>
              <div className={`${item.color} p-3 rounded-full`}>
                <item.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trip Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Trip Performance (Last 7 Days)
        </h2>
        <div className="flex items-end gap-3 h-40">
          {[50, 80, 65, 100, 75, 90, 60].map((value, i) => (
            <div
              key={i}
              className="w-10 bg-blue-500 rounded-md"
              style={{ height: `${value}%`, transition: "height 0.3s ease" }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </motion.div>

      {/* Recent Deliveries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Deliveries
        </h2>
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Trip ID</th>
              <th>Route</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((trip) => (
              <tr key={trip.id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium text-gray-800">{trip.id}</td>
                <td>{trip.route}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : trip.status === "In Transit"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trip.status}
                  </span>
                </td>
                <td>{trip.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Driver Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {drivers.map((driver, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {driver.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{driver.name}</p>
                  <p className="text-sm text-gray-500">Truck Driver</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdCircle
                  className={`${
                    driver.status === "Online"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                  size={10}
                />
                <span
                  className={`text-sm ${
                    driver.status === "Online"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {driver.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
