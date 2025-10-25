"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdBuild,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import axios from "axios";

// Vehicle interface
interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
  transporterId: number;
}

export default function FleetTracking() {
  const [username, setUsername] = useState("Transporter");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [transporterId, setTransporterId] = useState<number | null>(null);

  // Add Vehicle form state
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Active");
  const [model, setModel] = useState("");
  const [adding, setAdding] = useState(false);

  // Step 1: Fetch transporterId using email
  useEffect(() => {
    const fetchTransporter = async () => {
      const email = localStorage.getItem("email");
      if (!email) return alert("Email not found. Login again.");

      try {
        const res = await axios.get(
          `http://localhost:8080/api/transporters/by-email?email=${email}`
        );
        setTransporterId(res.data.id);
        localStorage.setItem("transporterId", res.data.id.toString());
        setUsername(res.data.user.username);
      } catch (err: any) {
        console.error("Error fetching transporter:", err.response || err.message);
        alert("Failed to fetch transporter details.");
      }
    };
    fetchTransporter();
  }, []);

  // Step 2: Fetch vehicles once transporterId is available
  useEffect(() => {
    if (transporterId) fetchVehicles(transporterId);
  }, [transporterId]);

  const fetchVehicles = async (id: number) => {
    setLoading(true);
    try {
      const res = await axios.get<Vehicle[]>(
        `http://localhost:8080/api/vehicles/transporter/${id}`
      );
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Add vehicle
  const handleAddVehicle = async (e: FormEvent) => {
    e.preventDefault();
    if (!transporterId) return alert("Transporter not ready yet.");

    setAdding(true);
    try {
      await axios.post(`http://localhost:8080/api/vehicles/add`, {
        vehicleNumber,
        model,
        vehicleType,
        transporterId,
      });

      setVehicleNumber("");
      setModel("");
      setVehicleType("Active");
      fetchVehicles(transporterId);
    } catch (err: any) {
      console.error("Error adding vehicle:", err.response?.data || err.message);
      alert("Failed to add vehicle. Check console.");
    } finally {
      setAdding(false);
    }
  };

  // Vehicle Stats
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.vehicleType === "Active").length;
  const idleVehicles = vehicles.filter((v) => v.vehicleType === "Idle").length;
  const maintenanceVehicles = vehicles.filter((v) => v.vehicleType === "Maintenance").length;

  const stats = [
    { label: "Total Vehicles", value: totalVehicles, icon: MdLocalShipping, color: "bg-blue-100 text-blue-600" },
    { label: "Active Now", value: activeVehicles, icon: MdCheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Idle Vehicles", value: idleVehicles, icon: MdWarning, color: "bg-yellow-100 text-yellow-600" },
    { label: "Under Maintenance", value: maintenanceVehicles, icon: MdBuild, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="space-y-8 bg-white min-h-screen">
      <TransporterHeader />

      <div className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fleet Tracking 🚚</h1>
          <p className="text-gray-500 mt-1">Monitor all your vehicles in real time.</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-4">
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

      {/* Add Vehicle Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mx-4"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Vehicle</h2>
        <form className="space-y-4" onSubmit={handleAddVehicle}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
              className="flex-1 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="flex-1 border p-2 rounded"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Idle">Idle</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={adding}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {adding ? "Adding..." : "Add Vehicle"}
          </button>
        </form>
      </motion.div>

      {/* Vehicle Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mx-4"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Live Vehicle Status</h2>
        {loading ? (
          <p>Loading vehicles...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Vehicle Number</th>
                  <th>Type</th>
                  <th>Model</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 font-medium text-gray-800">{v.vehicleNumber}</td>
                    <td>{v.vehicleType}</td>
                    <td>{v.model}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          v.vehicleType === "Active"
                            ? "bg-green-100 text-green-700"
                            : v.vehicleType === "Idle"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {v.vehicleType}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
