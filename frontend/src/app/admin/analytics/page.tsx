"use client";

import { MdBarChart, MdPeople, MdOutlineLocalShipping, MdCurrencyRupee } from "react-icons/md";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const adminAnalyticsData = {
  revenue: [
    { day: "Mon", revenue: 50000 },
    { day: "Tue", revenue: 60000 },
    { day: "Wed", revenue: 55000 },
    { day: "Thu", revenue: 70000 },
    { day: "Fri", revenue: 65000 },
    { day: "Sat", revenue: 80000 },
    { day: "Sun", revenue: 75000 },
  ],
  trips: [
    { day: "Mon", completed: 50, pending: 20 },
    { day: "Tue", completed: 60, pending: 15 },
    { day: "Wed", completed: 55, pending: 25 },
    { day: "Thu", completed: 70, pending: 10 },
    { day: "Fri", completed: 65, pending: 18 },
    { day: "Sat", completed: 80, pending: 12 },
    { day: "Sun", completed: 75, pending: 20 },
  ],
  users: [
    { name: "Customers", value: 450 },
    { name: "Transporters", value: 120 },
    { name: "Admins", value: 5 },
  ],
  colors: ["#3b82f6", "#10b981", "#f59e0b"],
};

const AdminAnalyticsSection = () => {
  return (
    <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2 mb-6">
        <MdBarChart className="w-5 h-5 text-blue-500" />
        <span>Analytics</span>
      </h2>

      {/* Revenue Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-700 flex items-center space-x-2 mb-2">
          <MdCurrencyRupee className="w-5 h-5 text-green-500" />
          <span>Revenue Trend (Weekly)</span>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adminAnalyticsData.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trips Completed vs Pending */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-700 flex items-center space-x-2 mb-2">
          <MdOutlineLocalShipping className="w-5 h-5 text-purple-500" />
          <span>Trips Status (Weekly)</span>
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adminAnalyticsData.trips}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users Distribution */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 flex items-center space-x-2 mb-2">
          <MdPeople className="w-5 h-5 text-yellow-500" />
          <span>User Distribution</span>
        </h3>
        <div className="w-full h-64 flex justify-center items-center">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={adminAnalyticsData.users}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {adminAnalyticsData.users.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={adminAnalyticsData.colors[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default AdminAnalyticsSection;
