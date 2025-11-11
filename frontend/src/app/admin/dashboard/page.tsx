"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "@/components/AdminSection/StatsCard";
import {
  MdPeople,
  MdLocalShipping,
  MdOutlineInventory,
  MdAttachMoney,
} from "react-icons/md";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import AdminHeader from "@/components/AdminSection/AdminHeader";

interface DashboardStats {
  customers: number;
  transporters: number;
  shipments: number;
  users: string | number;
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
  username: string;
  rating: number;
  totalShipments: number;
}

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    customers: 0,
    transporters: 0,
    shipments: 0,
    users: 0,
  });

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [topTransporters, setTopTransporters] = useState<Transporter[]>([]);
  const [shipmentStatus, setShipmentStatus] = useState<
    { username: string; value: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, transporterRes, bookingsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/customers"),
          axios.get("http://localhost:8080/api/transporters"),
          axios.get("http://localhost:8080/api/bookings/all/desc"),
        ]);

        // ✅ Basic counts
        const customerCount = customerRes.data.length || 0;
        const transporterCount = transporterRes.data.length || 0;
        const bookings = bookingsRes.data || [];

        // ✅ Helper functions
       const getCustomerName = async (id: number) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/customers/${id}`);
    return res.data.user?.username || `Customer #${id}`;
  } catch {
    return `Customer #${id}`;
  }
};

const getTransporterName = async (id: number) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/transporters/${id}`);
    return res.data.user?.username || `Transporter #${id}`;
  } catch {
    return `Transporter #${id}`;
  }
};

        setStats({
          customers: customerCount,
          transporters: transporterCount,
          shipments: bookings.length,
          users: customerCount + transporterCount,
        });

        // ✅ Enrich bookings with customer & transporter names
        const enrichedBookings = await Promise.all(
          bookings.map(async (b: any) => ({
            id: b.id,
            customer: b.customerName || (await getCustomerName(b.customerId)),
            transporter: b.transporterName || (await getTransporterName(b.transporterId)),
            from: b.pickupAddress || "N/A",
            to: b.dropAddress || "N/A",
            status: b.status || "Unknown",
            price: b.finalCost || b.estimatedCost || 0,
          }))
        );

        setShipments(enrichedBookings);

        // ✅ Shipment status for Pie chart
        const statusCount: Record<string, number> = {};
        bookings.forEach((b: any) => {
          const status = b.status || "Unknown";
          statusCount[status] = (statusCount[status] || 0) + 1;
        });
        setShipmentStatus(
          Object.entries(statusCount).map(([username, value]) => ({
            username,
            value,
          }))
        );

        // ✅ Dummy Top Transporters
        setTopTransporters([
          { username: "Rohit Logistics", rating: 4.8, totalShipments: 80 },
          { username: "Sharma Transports", rating: 4.5, totalShipments: 65 },
          { username: "FastMove", rating: 4.2, totalShipments: 50 },
        ]);
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background border border-white dark:border-card transition-colors duration-300 p-0 m-0">
      <AdminHeader />
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50 p-4">
        Admin Dashboard
      </h1>

      {/* 🔹 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        <StatsCard title="Users" value={stats.users} icon={<MdAttachMoney size={26} />} color="bg-yellow-500" />
        <StatsCard title="Customers" value={stats.customers} icon={<MdPeople size={26} />} color="bg-purple-500" />
        <StatsCard title="Transporters" value={stats.transporters} icon={<MdLocalShipping size={26} />} color="bg-green-500" />
        <StatsCard title="Shipments" value={stats.shipments} icon={<MdOutlineInventory size={26} />} color="bg-blue-500" />
      </div>

      {/* 🔹 Shipment Chart & Top Transporters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-background border border-white dark:border-card p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipment Status Overview</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={shipmentStatus} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value">
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
        <div className="bg-white dark:bg-background border border-white dark:border-card p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Transporters</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">username</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Shipments</th>
              </tr>
            </thead>
            <tbody>
              {topTransporters.map((t, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{t.username}</td>
                  <td className="p-2">{t.rating} ⭐</td>
                  <td className="p-2">{t.totalShipments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 Recent Shipments Table */}
      <div className="bg-gray-50 dark:bg-background p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
        <div className="overflow-x-auto bg-white dark:bg-background border border-white dark:border-card">
          <table className="w-full text-sm border-collapse">
            <thead className="border-b bg-gray-100 dark:bg-card text-left">
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
                <tr key={s.id} className="border-b hover:bg-gray-50 dark:hover:bg-purple-400">
                  <td className="p-2">{s.id}</td>
                  <td className="p-2">{s.customer}</td>
                  <td className="p-2">{s.transporter}</td>
                  <td className="p-2">{s.from}</td>
                  <td className="p-2">{s.to}</td>
                  <td
                    className={`p-2 font-medium ${
                      s.status === "DELIVERED"
                        ? "text-green-600"
                        : s.status === "IN_TRANSIT"
                        ? "text-blue-600"
                        : s.status === "PENDING"
                        ? "text-yellow-600"
                        : "text-gray-600"
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
