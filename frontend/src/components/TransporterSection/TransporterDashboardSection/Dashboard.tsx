"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  // ✅ Sidebar Collapse Sync
  useEffect(() => {
    const updateSidebar = () => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", updateSidebar);
    return () => window.removeEventListener("storage", updateSidebar);
  }, []);

  //  Fetch Transporter Details
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

  //Fetch Drivers and Vehicles
  useEffect(() => {
    if (!transporterId) return;
    axios
      .get(
        `http://localhost:8080/api/transporters/drivers/transporter/${transporterId}`
      )
      .then((res) => setDrivers(res.data.map((d: Driver) => ({ ...d }))))
      .catch((err) => console.error("Error fetching drivers:", err));

    // Fetch Vehicles
    axios
      .get(`http://localhost:8080/api/vehicles/transporter/${transporterId}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, [transporterId]);

  console.log(" driver", drivers);

  const totalVehicles = vehicles.length;
  const totalDrivers = drivers.length;
  console.log("total driver", totalDrivers);
  const totalShipments = vehicles.length;
  const totalRevenue = 4000;

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
      label: "Total Revenue",
      value: "₹" + totalRevenue,
      icon: MdTrendingUp,
    },
  ];

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300 p-0 m-0"
    >
      <TransporterHeader />

      <div className=" px-5 pt-4  flex flex-col lg:flex-row justify-between items-start gap-4 mb-3">
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

      {/*  Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 px-5 ">
        {STAT_CARDS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl  bg-white dark:bg-card shadow-lg flex flex-col justify-between"
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
              <div className={`p-3 bg-violet-300 rounded-full`}>
                 <item.icon className="text-violet-600 text-2xl" />
              </div>

             
            </div>
          </motion.div>
        ))}
        <div className="grid grid-cols- md:grid-cols-4 md:col-span-4 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 md:col-span-3 gap-4">
            <RecentShipment />
           <DriverStatus/>
            <VehicleStatus />
          </div>
          <Chart />
        </div>
      </div>
    </div>
  );
}
