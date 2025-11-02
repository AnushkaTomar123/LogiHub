"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdPeople,
  MdCurrencyRupee,
  MdOutlineRoute,
  MdCircle,
  MdViewModule, // Icon for Total Shipments
  MdTrendingUp, // Icon for Total Revenue
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import { FaUsers, FaTruckMoving } from "react-icons/fa";
import dynamic from "next/dynamic";

// --- Mock Data / Utility Functions (for UI) ---

const getDriverStatus = (id: number) => {
  return id % 2 === 0 ? "Online" : "Offline";
};

// --- Interfaces (Kept same) ---

interface Driver {
  licenseNumber:string;
  id: number;
  driverName: string;
  status?: string;
}

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
}

// --- Dashboard Component ---

export default function TransporterDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("Transporter");
  const [transporterId, setTransporterId] = useState<number | null>(null);

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Mocked list for recent shipments (API not used)
  const MOCK_SHIPMENTS = [
    { id: 1, label: "Shipping id S112233" },
    { id: 2, label: "Shipping id S123456" },
    { id: 3, label: "Shipping id S134567" },
  ];

 

  // ✅ Sidebar collapse tracking (Kept same)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "sidebarCollapsed") {
        setSidebarCollapsed(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    const sameTabHandler = (ev: Event) => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", sameTabHandler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("storage", sameTabHandler);
    };
  }, []);

  // ✅ Fetch Transporter Details (Kept same)
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(
          `http://localhost:8080/api/transporters/by-email?email=${storedEmail}`
        )
        .then((res) => {
          const id = res.data.id;
          setTransporterId(id);
          localStorage.setItem("transporterId", id.toString());
        })
        .catch((err) =>
          console.error("Error fetching transporter by email:", err)
        );
    }
  }, []);

  // ✅ Fetch Drivers and Vehicles (Kept same)
  useEffect(() => {
    if (!transporterId) return;

    // Fetch Drivers
    axios
      .get(`http://localhost:8080/api/transporters/drivers/${transporterId}`)
      .then((res) =>
        setDrivers(
          res.data.map((d: Driver) => ({ ...d, status: getDriverStatus(d.id) }))
        )
      )
      .catch((err) => console.error("Error fetching drivers:", err));

    // Fetch Vehicles
    axios
      .get(`http://localhost:8080/api/vehicles/transporter/${transporterId}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, [transporterId]);
  

  // --- Stats Calculation for Stat Cards ---
  const totalVehicles = vehicles.length;
  const totalDrivers = drivers.length;
  const totalShipments = vehicles.length;
  const totalRevenue = 4000;

  const STAT_CARDS = [
    {
      label: "Total Shipments",
      value: totalShipments,
      icon: MdViewModule,
      color: "bg-indigo-50 text-indigo-600",
      fixedWidth: true,
    },
    {
      label: "Total Drivers",
      value: totalDrivers,
      icon: MdPeople,
      color: "bg-emerald-50 text-emerald-600",
      fixedWidth: true,
    },
    {
      label: "Total Vehicles",
      value: totalVehicles,
      icon: MdLocalShipping,
      color: "bg-yellow-50 text-yellow-600",
      fixedWidth: true,
    },
    {
      label: "Total Revenue",
      value: "₹" + totalRevenue,
      icon: MdTrendingUp,
      color: "bg-rose-50 text-rose-600",
      fixedWidth: true,
    },
  ];
  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen p-0 bg-gray-50  dark:bg-background transition-colors duration-300"
    >
      <TransporterHeader />

      <main className="p-5">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
          <div className="col-span-1 dark:border-border">
            <h1 className="text-xl p-2 rounded-lg font-bold bg-gray-100 dark:bg-card text-gray-700 dark:text-white">
              Welcome Back, {username}!!
            </h1>
          </div>
          <div className="text-xl p-2 rounded-lg bg-gray-100 dark:bg-card text-gray-500 dark:text-gray-400 dark:border-border">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <div className="grid  grid-cols-1 md:grid-cols-4 gap-6">
          {/* 1. Stat Cards */}
          {STAT_CARDS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl border border-gray-400  dark:border-border  bg-gray-100 dark:bg-card shadow-lg md:col-span-1"
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-sm text-gray-700 dark:text-gray-400">{item.label}</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-400  dark:text-gray-600">
                  {item.value}
                </h3>
              </div>
            </motion.div>
          ))}
          <div className="grid grid-cols- md:grid-cols-3 md:col-span-3 gap-6">
            {/* 2. Recent Shipments*/}
            <div className="col-span-1 p-4 rounded-xl bg-white  dark:bg-card border border-gray-400 dark:border-border shadow-lg md:h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
                  Recent Shipments
                </h3>
              </div>

              <div className="space-y-3">
                {MOCK_SHIPMENTS.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-white dark:bg-background border border-gray-800 text-sm text-gray-300"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            {/* 3. Driver Status  */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 p-3 rounded-xl bg-gray-100 dark:bg-card border border-border shadow-lg md:h-[200px]">
              <div className="md:col-span-2 flex items-center justify-between mb-1">
                <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
                  Driver Status
                </h3>
                <button
                  onClick={() => router.push("/transporter/drivers")}
                  className="text-xs px-2 py-1 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition"
                >
                  Show More
                </button>
              </div>

              {drivers.slice(0,4).map((driver, index) => (
                <div
                  key={index}
                  className="col-span-1 flex items-center gap-2 p-2 rounded-lg border border-gray-400 dark:border-border bg-white dark:bg-card transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center font-semibold text-sm">
                    {driver.driverName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-xs text-gray-100 dark:text-gray-600">
                      {driver.driverName}
                    </p>
                    <p className="text-[10px] text-gray-400"><span>License No.:{driver.licenseNumber}</span></p>
                  </div>
                  <MdCircle
                    className={`ml-auto ${
                      driver.status === "Available"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                    size={10}
                  />
                </div>
              ))}
            </div>
            {/* 5. Vehicle Status  */}
            <div className="col-span-3 p-4 rounded-xl bg-gray-100 dark:bg-card border border-gray-400 dark:border-border shadow-lg min-h-[150px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
                  Vehicle Status
                </h3>
                <button
                  onClick={() => router.push("/transporter/fleet")}
                  className="px-3 py-1 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition text-xs"
                >
                  Show More
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {vehicles.slice(0,4).map((v) => (
                  <div
                    key={v.id}
                    className="col-span-1 flex items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-card border border-gray-800"
                  >
                    <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <MdLocalShipping size={22} className="text-gray-700  dark:text-gray-200" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-100 dark:text-gray-600">
                        Vehicle number: {v.vehicleNumber}
                      </p>
                      <p className="text-xs text-gray-400">
                        Vehicle type: {v.vehicleType}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Chart & Legend  */}
          <div className="col-span-1 space-y-6">
            <aside className="bg-gray-100 dark:bg-card rounded-xl p-4 border border-gray-400 dark:border-border shadow-lg flex flex-col items-center">
              <div className="w-full h-44 flex items-center justify-center">
                <div className="w-40 h-40 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    Chart Placeholder
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="w-full mt-4 space-y-3">
                {[
                  { label: "Truck", value: 80, color: "bg-violet-600" },
                  { label: "Trailer", value: 65, color: "bg-blue-500" },
                  { label: "Tempo", value: 50, color: "bg-orange-500" },
                  { label: "Cargo Van", value: 30, color: "bg-green-500" },
                  { label: "Mini Truck", value: 20, color: "bg-red-500" },
                ].map((it) => (
                  <div key={it.label} className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">{it.label}</span>
                      <span className="text-gray-400">{it.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${it.color}`}
                        style={{ width: `${it.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            {/* 6. Tracking Shipment Button (Below Chart) */}
            <div className="col-span-1">
              <div className="bg-gray-100 dark:bg-card rounded-xl p-0 border border-border shadow-lg">
                <button
                  onClick={() => router.push("/transporter/shipment")}
                  className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition"
                >
                  Tracking Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
