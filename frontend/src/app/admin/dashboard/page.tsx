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
  name: string;
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
    { name: string; value: number }[]
  >([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, transporterRes] = await Promise.all([
          axios.get("http://localhost:8080/api/customers"),
          axios.get("http://localhost:8080/api/transporters"),
        ]);

        // Assuming API returns arrays
        const customerCount = customerRes.data.length || 0;
        const transporterCount = transporterRes.data.length || 0;

        setStats({
          customers: customerCount,
          transporters: transporterCount,
          shipments: 320, // Dummy
          users: customerCount+transporterCount, // Dummy
        });
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();

    // Dummy shipment and transporter data
    setShipments([
      {
        id: 1001,
        customer: "Anushka",
        transporter: "Rohit Logistics",
        from: "Delhi",
        to: "Mumbai",
        status: "In Transit",
        price: 55000,
      },
      {
        id: 1002,
        customer: "Rahul",
        transporter: "Sharma Transports",
        from: "Indore",
        to: "Bhopal",
        status: "Delivered",
        price: 12000,
      },
      {
        id: 1003,
        customer: "Priya",
        transporter: "FastMove",
        from: "Jaipur",
        to: "Surat",
        status: "Pending",
        price: 22000,
      },
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
    <div  
      className="min-h-screen bg-gray-50 dark:bg-background border border-white dark:border-card transition-colors duration-300 p-0 m-0">
     <AdminHeader/>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50 p-4">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
          <StatsCard
          title="Users"
          value={stats.users}
          icon={<MdAttachMoney size={26} />}
          color="bg-yellow-500"
        />
        <StatsCard title="Customers" 
        value={stats.customers} 
        icon={<MdPeople size={26} 
         />}
          color="bg-purple-500" />
        <StatsCard
          title="Transporters"
          value={stats.transporters}
          icon={<MdLocalShipping size={26} />}
          color="bg-green-500"
        />
        <StatsCard
          title="Shipments"
          value={stats.shipments}
          icon={<MdOutlineInventory size={26} />}
          color="bg-blue-500"
        />
      
      </div>

      {/* Shipment Status Chart + Top Transporters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-background border border-white dark:border-card p-6 rounded-2xl shadow-md">
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
        <div className="bg-white dark:bg-background border border-white dark:border-card p-6 rounded-2xl shadow-md ">
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
      <div className="bg-gray-50 dark:bg-background   p-4  ">
        <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
        <div className="overflow-x-auto bg-white dark:bg-background border border-white dark:border-card ">
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
                      s.status === "Delivered"
                        ? "text-green-600"
                        : s.status === "In Transit"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {s.status}
                  </td>
                  <td className="p-2 text-right">
                    ₹{s.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
