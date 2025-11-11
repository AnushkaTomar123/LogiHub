"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import CustomerHeader from "@/components/CustomerSection/Customerheader";
import OrderCard from "./OrderCard";
interface Order {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  expectDeliveryDate: string;
  goodsDescription: string;
  estimatedCost: number;
  vehicleType: string;
  status: string;
}

export default function MyOrders() {
  const [userName, setUsername] = useState("Customer");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const updateSidebar = () => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", updateSidebar);
    return () => window.removeEventListener("storage", updateSidebar);
  }, []);

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const statusLabels: Record<string, string> = {
    PENDING: "Pending",
    AWAITING_PAYMENT: "Awaiting Payment",
    ACCEPTED: "Accepted",
    CONFIRMED: "On Route",
    DELIVERED: "Delivered",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(`http://localhost:8080/api/customers/by-email?email=${storedEmail}`)
        .then((res) => {
          const id = res.data.id;
          setCustomerId(id);
          localStorage.setItem("customerId", id.toString());
        })
        .catch((err) => console.error("Error fetching customer:", err));
    }
  }, []);

  // ✅ Fetch orders by customer
  useEffect(() => {
    if (!customerId) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/bookings/customer/${customerId}`)
      .then((res) => {
        if (Array.isArray(res.data)) setOrders(res.data);
        else setOrders([]);
      })
      .catch(() => setError("Failed to fetch orders"))
      .finally(() => setLoading(false));
  }, [customerId]);

  // ✅ Filter orders by selected status
  const filteredOrders =
    status === "PENDING"
      ? orders.filter((o) => o.status === "PENDING")
      : orders.filter((o) => o.status === status);

  return (
    <div  style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-200 transition-colors duration-300">
      <CustomerHeader />

      <div className="p-6">
        {/* 🟣 Page Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            My Orders ({userName})
          </h1>
        </div>

        {/* 🟪 Status Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {Object.entries(statusLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setStatus(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                status === key
                  ? "bg-violet-600 dark:bg-purple-800 text-white shadow-md scale-105"
                  : "bg-gray-300 dark:bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 🟩 Orders Section */}
        {loading ? (
          <div className="flex justify-center items-center h-60 text-gray-400">
            <FaSpinner className="animate-spin mr-2" /> Loading orders...
          </div>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No orders found for this status.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
