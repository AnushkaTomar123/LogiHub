"use client";
import { useEffect, useState } from "react";
import StatsCard from "../../../components/admin/StatsCard";
import OrderTable from "../../../components/admin/OrderTable";
import { MdPeople, MdOutlineLocalShipping, MdAttachMoney } from "react-icons/md";
import { stats as mockStats, orders as mockOrders } from "../../../lib/mockdata";



// 1️⃣ Define the type
interface Order {
  id: number;
  customer: string;
  transporter: string;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, transporters: 0, revenue: 0 });

  // 2️⃣ Use generic type with useState
  const [orders, setOrders] = useState<Order[]>([]); // ✅ Specify Order[] here

  useEffect(() => {
    setStats(mockStats);
    setOrders(mockOrders); // ✅ Now TypeScript knows this is Order[]
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Users" value={stats.users} icon={<MdPeople size={24} />} />
        <StatsCard title="Active Transporters" value={stats.transporters} icon={<MdOutlineLocalShipping size={24} />} color="bg-green-500" />
        <StatsCard title="Revenue" value={stats.revenue} icon={<MdAttachMoney size={24} />} color="bg-yellow-500" />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}
