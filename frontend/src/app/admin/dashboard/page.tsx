"use client";
import { useEffect, useState } from "react";
import StatsCard from "@/components/admin/StatsCard";
import { MdPeople, MdLocalShipping, MdOutlineInventory, MdAttachMoney } from "react-icons/md";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DashboardStats {
  customers: number;
  transporters: number;
  shipments: number;
  revenue: string|number;
}

interface Shipment {
  id: number;
  customer: string;
  transporter: string;
  from: string;
  to: string;
  status: string;
  price: number;
}

interface Transporter {
  name: string;
  rating: number;
  totalShipments: number;
}

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"]; // Tailwind greens, blues, etc.

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    customers: 0,
    transporters: 0,
    shipments: 0,
    revenue: 0,
  });

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [topTransporters, setTopTransporters] = useState<Transporter[]>([]);
  const [shipmentStatus, setShipmentStatus] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // Dummy data for now
    setStats({ customers: 120, transporters: 45, shipments: 320, revenue: 760000 });

    setShipments([
      { id: 1001, customer: "Anushka", transporter: "Rohit Logistics", from: "Delhi", to: "Mumbai", status: "In Transit", price: 55000 },
      { id: 1002, customer: "Rahul", transporter: "Sharma Transports", from: "Indore", to: "Bhopal", status: "Delivered", price: 12000 },
      { id: 1003, customer: "Priya", transporter: "FastMove", from: "Jaipur", to: "Surat", status: "Pending", price: 22000 },
    ]);

    setTopTransporters([
      { name: "Rohit Logistics", rating: 4.8, totalShipments: 80 },
      { name: "Sharma Transports", rating: 4.5, totalShipments: 65 },
      { name: "FastMove", rating: 4.2, totalShipments: 50 },
    ]);

    setShipmentStatus([
      { name: "Delivered", value: 120 },
      { name: "In Transit", value: 80 },
      { name: "Pending", value: 70 },
      { name: "Cancelled", value: 50 },
    ]);
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Customers" value={stats.customers} icon={<MdPeople size={26} />} />
        <StatsCard title="Transporters" value={stats.transporters} icon={<MdLocalShipping size={26} />} color="bg-green-500" />
        <StatsCard title="Shipments" value={stats.shipments} icon={<MdOutlineInventory size={26} />} color="bg-blue-500" />
        <StatsCard title="Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={<MdAttachMoney size={26} />} color="bg-yellow-500" />
      </div>

      {/* Shipment Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipment Status Overview</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={shipmentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {shipmentStatus.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Transporters */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Transporters</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Shipments</th>
              </tr>
            </thead>
            <tbody>
              {topTransporters.map((t, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{t.name}</td>
                  <td className="p-2">{t.rating} ⭐</td>
                  <td className="p-2">{t.totalShipments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
  <div className="overflow-x-auto">  
    <table className="w-full text-sm border-collapse">
      <thead className="border-b bg-gray-100 text-left">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Transporter</th>
          <th className="p-2">From</th>
          <th className="p-2">To</th>
          <th className="p-2">Status</th>
          <th className="p-2 text-right">Price</th> 
        </tr>
      </thead>
      <tbody>
        {shipments.map((s) => (
          <tr key={s.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{s.id}</td>
            <td className="p-2">{s.customer}</td>
            <td className="p-2">{s.transporter}</td>
            <td className="p-2">{s.from}</td>
            <td className="p-2">{s.to}</td>
            <td
              className={`p-2 font-medium ${
                s.status === "Delivered"
                  ? "text-green-600"
                  : s.status === "In Transit"
                  ? "text-blue-600"
                  : "text-yellow-600"
              }`}
            >
              {s.status}
            </td>
            <td className="p-2 text-right">₹{s.price.toLocaleString()}</td> 
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}
