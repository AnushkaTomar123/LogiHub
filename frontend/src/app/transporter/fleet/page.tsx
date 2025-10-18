"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdBuild,
  MdCheckCircle,
  MdWarning,
  MdLocationOn,
  MdAccessTime,
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";

export default function FleetTracking() {
  const [username, setUsername] = useState("Transporter");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  const stats = [
    { label: "Total Vehicles", value: 32, icon: MdLocalShipping, color: "bg-blue-100 text-blue-600" },
    { label: "Active Now", value: 18, icon: MdCheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Idle Vehicles", value: 9, icon: MdWarning, color: "bg-yellow-100 text-yellow-600" },
    { label: "Under Maintenance", value: 5, icon: MdBuild, color: "bg-red-100 text-red-600" },
  ];

  const fleetData = [
    {
      id: "TRK-101",
      driver: "Rahul Sharma",
      route: "Indore → Bhopal",
      status: "Active",
      progress: 76,
      lastUpdate: "5 mins ago",
    },
    {
      id: "TRK-102",
      driver: "Vikram Singh",
      route: "Pune → Mumbai",
      status: "Idle",
      progress: 0,
      lastUpdate: "20 mins ago",
    },
    {
      id: "TRK-103",
      driver: "Amit Verma",
      route: "Delhi → Jaipur",
      status: "Active",
      progress: 52,
      lastUpdate: "2 mins ago",
    },
    {
      id: "TRK-104",
      driver: "Suresh Yadav",
      route: "Lucknow → Kanpur",
      status: "Maintenance",
      progress: 0,
      lastUpdate: "1 hr ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <TransporterHeader/>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fleet Tracking 🚚</h1>
          <p className="text-gray-500 mt-1">Monitor and track all your vehicles in real time.</p>
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

      {/* Stats */}
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

      {/* Live Fleet Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Vehicle Status</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Vehicle ID</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {fleetData.map((truck) => (
                <tr key={truck.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 font-medium text-gray-800">{truck.id}</td>
                  <td>{truck.driver}</td>
                  <td className="flex items-center gap-1">
                    <MdLocationOn className="text-blue-500" size={16} /> {truck.route}
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        truck.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : truck.status === "Idle"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {truck.status}
                    </span>
                  </td>
                  <td>
                    <div className="w-32 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          truck.status === "Active" ? "bg-blue-500" : "bg-gray-400"
                        }`}
                        style={{ width: `${truck.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="text-gray-500 flex items-center gap-1">
                    <MdAccessTime size={14} /> {truck.lastUpdate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-10 text-center border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Live Fleet Map (Coming Soon)</h2>
        <p className="text-gray-600 text-sm">
          A real-time map will be integrated here to visualize all vehicle locations.
        </p>
      </motion.div>
    </div>
  );
}
