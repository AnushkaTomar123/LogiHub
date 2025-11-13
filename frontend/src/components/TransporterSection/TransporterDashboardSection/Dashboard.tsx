"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdPeople,
  MdViewModule,
  MdTrendingUp,
} from "react-icons/md";
import TransporterHeader from "../TransporterHeader";
import DriverStatus from "./DriverStatus";
import VehicleStatus from "./VehicleStatus";
import Chart from "./Chart";
import RecentShipment from "./RecentShipment";

interface Driver {
  licenseNumber: string;
  id: number;
  driverName: string;
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
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0); // 🔹 New state for earnings

  const BASE_URL = "http://localhost:8080/api/wallets";

  // 🔹 Fetch Transporter ID
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(`http://localhost:8080/api/transporters/by-email?email=${storedEmail}`)
        .then((res) => {
          const id = res.data.id;
          setTransporterId(id);
          localStorage.setItem("transporterId", id.toString());
        })
        .catch((err) => console.error("Error fetching transporter by email:", err));
    }
  }, []);

  // 🔹 Fetch Drivers & Vehicles
  useEffect(() => {
    if (!transporterId) return;
    axios
      .get(`http://localhost:8080/api/transporters/drivers/transporter/${transporterId}`)
      .then((res) => setDrivers(res.data))
      .catch((err) => console.error("Error fetching drivers:", err));

    axios
      .get(`http://localhost:8080/api/vehicles/transporter/${transporterId}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, [transporterId]);

  // 🔹 Fetch Total Earnings (TRANSFER_IN)
  useEffect(() => {
    const fetchEarnings = async () => {
      if (!transporterId) return;
      try {
        // Get wallet details
        const walletRes = await axios.get(`${BASE_URL}/TRANSPORTER/${transporterId}`);
        const walletId = walletRes.data.id;

        // Get all TRANSFER_IN transactions
        const transferInRes = await axios.get(
          `${BASE_URL}/transactions/${walletId}/type/TRANSFER_IN`
        );

        const total = transferInRes.data.reduce(
          (sum: number, txn: any) => sum + txn.amount,
          0
        );
        setTotalRevenue(total);
      } catch (err) {
        console.error("Error fetching transporter earnings:", err);
      }
    };

    fetchEarnings();
  }, [transporterId]);

  const totalVehicles = vehicles.length;
  const totalDrivers = drivers.length;
  const totalShipments = vehicles.length;

  const STAT_CARDS = [
    {
      label: "Total Shipments",
      value: totalShipments,
      icon: MdViewModule,
    },
    {
      label: "Total Drivers",
      value: totalDrivers,
      icon: MdPeople,
    },
    {
      label: "Total Vehicles",
      value: totalVehicles,
      icon: MdLocalShipping,
    },
    {
      label: "Total Earning",
      value: "₹" + totalRevenue.toLocaleString(), // 🔹 Display Transfer IN total
      icon: MdTrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300 p-0 m-0">
      <TransporterHeader />

      {/* Header */}
      <div className="px-5 pt-4 flex flex-col lg:flex-row justify-between items-start gap-4 mb-3">
        <h1 className="text-xl p-1 pr-12 pl-3 rounded-lg font-medium bg-white dark:bg-card text-gray-700 dark:text-white">
          Welcome Back, {username}!!
        </h1>
        <div className="text-xl px-8 p-1 rounded-lg bg-white dark:bg-card text-gray-500 dark:text-gray-50">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 px-5">
        {STAT_CARDS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl bg-white dark:bg-card shadow-lg flex flex-col justify-between"
          >
            <div className="flex justify-between items-center gap-3">
              <div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mt-2">
                  {item.label}
                </h3>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  {item.value}
                </p>
              </div>
              <div className="p-3 bg-violet-300 rounded-full">
                <item.icon className="text-violet-600 text-2xl" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Rest of dashboard content */}
        <div className="grid grid-cols- md:grid-cols-4 md:col-span-4 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 gap-4">
            <RecentShipment />
            <DriverStatus />
            <VehicleStatus />
          </div>
          <Chart />
        </div>
      </div>
    </div>
  );
}
