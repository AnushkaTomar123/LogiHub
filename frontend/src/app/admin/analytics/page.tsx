"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  MdBarChart,
  MdPeople,
  MdOutlineLocalShipping,
  MdCurrencyRupee,
} from "react-icons/md";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminHeader from "@/components/AdminSection/AdminHeader";

interface BookingData {
  completed: number;
  pending: number;
  cancelled: number;
}

interface UserCount {
  Customers: number;
  Transporters: number;
  Admins: number;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function AdminAnalyticsSection() {
  const [bookings, setBookings] = useState<BookingData>({
    completed: 0,
    pending: 0,
    cancelled: 0,
  });
  const [users, setUsers] = useState<UserCount>({
    Customers: 0,
    Transporters: 0,
    Admins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [pending, completed, cancelled] = await Promise.all([
          axios.get("http://localhost:8080/api/bookings/status/PENDING"),
          axios.get("http://localhost:8080/api/bookings/status/COMPLETED"),
          axios.get("http://localhost:8080/api/bookings/status/CANCELLED"),
        ]);

        setBookings({
          pending: pending.data.length,
          completed: completed.data.length,
          cancelled: cancelled.data.length,
        });

        const userRes = await axios.get("http://localhost:8080/api/profile/all");
        const data = userRes.data;

        setUsers({
          Customers: data.filter((u: any) => u.role === "CUSTOMER").length,
          Transporters: data.filter((u: any) => u.role === "TRANSPORTER").length,
          Admins: data.filter((u: any) => u.role === "ADMIN").length,
        });
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 dark:text-gray-200">
        Loading Analytics...
      </div>
    );
  }

  const tripStatusLineData = [
    { day: "Mon", Completed: bookings.completed, Pending: bookings.pending, Cancelled: bookings.cancelled },
    { day: "Tue", Completed: bookings.completed - 1, Pending: bookings.pending + 1, Cancelled: bookings.cancelled },
    { day: "Wed", Completed: bookings.completed - 2, Pending: bookings.pending + 2, Cancelled: bookings.cancelled },
    { day: "Thu", Completed: bookings.completed + 1, Pending: bookings.pending - 1, Cancelled: bookings.cancelled },
    { day: "Fri", Completed: bookings.completed + 2, Pending: bookings.pending - 2, Cancelled: bookings.cancelled },
  ];

  const userDistributionData = [
    { name: "Customers", value: users.Customers },
    { name: "Transporters", value: users.Transporters },
    { name: "Admins", value: users.Admins },
  ];

  return (
    <section className="bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 min-h-screen">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* Header */}
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-gray-100">
          <MdBarChart className="text-purple-600" /> Analytics Overview
        </h2>

        {/* Trip Status Line Chart */}
        <div className="bg-white dark:bg-card rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-600 dark:text-purple-600 mb-4">
            <MdOutlineLocalShipping /> Shipment Status
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tripStatusLineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none' }} />
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
                <Line type="monotone" dataKey="Completed" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="Pending" stroke="#f59e0b" strokeWidth={3} />
                <Line type="monotone" dataKey="Cancelled" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-white dark:bg-card rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-500 dark:text-orange-400 mb-4">
            <MdPeople /> User Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                  dataKey="value"
                >
                  {userDistributionData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none' }} />
                <Legend wrapperStyle={{ color: '#d1d5db' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Line Chart */}
        <div className="bg-white dark:bg-card rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600 dark:text-green-400 mb-4">
            <MdCurrencyRupee /> Revenue Trend (Sample)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { day: "Mon", revenue: 50000 },
                  { day: "Tue", revenue: 60000 },
                  { day: "Wed", revenue: 55000 },
                  { day: "Thu", revenue: 70000 },
                  { day: "Fri", revenue: 65000 },
                  { day: "Sat", revenue: 80000 },
                  { day: "Sun", revenue: 75000 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none' }} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
