"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadCard from "./LoadCards";
import PostNewLoadForm from "./PostNewLoad";
import LoadHistory from "./LoadHistory";
import TransporterHeader from "@/components/TransporterSection/TransporterHeader";
import { MdLocalShipping, MdTrendingUp, MdViewModule } from "react-icons/md";

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
export default function LoadPostingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) return;

    axios
      .get(`http://localhost:8080/api/bookings/customer/${customerId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total = orders.length;
  const delivered = orders.filter((o) => o.status === "COMPLETED").length;
  const pending = orders.filter((o) => o.status === "PENDING").length;
  const transit = orders.filter((o) => o.status === "IN_TRANSIT").length;

  return (
    <div  style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-300 px-6">
         <TransporterHeader />
      <div className="flex justify-between items-center mt-2 mb-6 p-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 px-3 ">Load Posting</h1>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-violet-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg font-semibold">
          Post New Load
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <LoadCard title="Active Loads" count={12} icon={MdLocalShipping} colorClass="bg-white dark:bg-card" />
      <LoadCard title="Completed Loads" count={8} icon={MdTrendingUp} colorClass="bg-white dark:bg-card" />
      <LoadCard title="Total Loads" count={20} icon={MdViewModule} colorClass="bg-white dark:bg-card" />
    </div>

      <LoadHistory orders={orders} />

      {showForm && <PostNewLoadForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
