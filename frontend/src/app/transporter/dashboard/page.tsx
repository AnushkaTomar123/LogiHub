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

// Interfaces
interface Driver {
  id: number;
  driverName: string;
  status: string;
}

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
}

export default function TransporterDashboard() {
  const [username, setUsername] = useState("Transporter");
  const [transporterId, setTransporterId] = useState<number | null>(null);

  // Dynamic data
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Get username from localStorage
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    // Fetch transporterId by email
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(`http://localhost:8080/api/transporters/by-email?email=${storedEmail}`)
        .then((res) => {
          const id = res.data.id; // transporter id
          setTransporterId(id);
          localStorage.setItem("transporterId", id.toString());
          console.log("✅ Transporter ID fetched:", id);
        })
        .catch((err) =>
          console.error("❌ Error fetching transporter by email:", err)
        );
    }
  }, []);

  // Fetch drivers & vehicles once transporterId is available
  useEffect(() => {
    if (!transporterId) return;

    // Fetch drivers
    axios
      .get(`http://localhost:8080/api/transporters/drivers/${transporterId}`)
      .then((res) => setDrivers(res.data))
      .catch((err) => console.error("Error fetching drivers:", err));

    // Fetch vehicles
    axios
      .get(`http://localhost:8080/api/vehicles/transporter/${transporterId}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, [transporterId]);

  // Stats calculations
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(
    (v) => v.vehicleType.toLowerCase() === "active"
  ).length;
  const maintenanceVehicles = vehicles.filter(
    (v) => v.vehicleType.toLowerCase() === "maintenance"
  ).length;

  const totalDrivers = drivers.length;

  const stats = [
    {
      label: "Total Trips",
      value: 124,
      icon: MdOutlineRoute,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Drivers",
      value: totalDrivers,
      icon: MdPeople,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Active Vehicles",
      value: activeVehicles,
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

      {/* Drivers Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                  {driver.driverName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{driver.driverName}</p>
                  <p className="text-sm text-gray-500">Truck Driver</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MdCircle
                  className={`${
                    driver.status?.toLowerCase() === "online"
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                  size={10}
                />
                <span
                  className={`text-sm ${
                    driver.status?.toLowerCase() === "online"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {driver.status || "Offline"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vehicles Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Vehicles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Vehicle Number</th>
                <th>Type</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-800">{v.vehicleNumber}</td>
                  <td>{v.vehicleType}</td>
                  <td>{v.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
