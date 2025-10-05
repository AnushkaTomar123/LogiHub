"use client";
import { useState } from "react";
import {
  MdOutlineLocalShipping,
  MdPeople,
  MdSettings,
  MdAssignmentInd,
  MdDashboard,
  MdSecurity,
  MdAnalytics,
} from "react-icons/md";

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const roles: Role[] = [
    { id: 1, name: "Admin", permissions: ["Manage Users", "View Reports", "Change Roles"] },
    { id: 2, name: "Transporter", permissions: ["Manage Fleet", "View Orders"] },
    { id: 3, name: "Customer", permissions: ["Book Vehicles", "Track Orders"] },
  ];

  const users: User[] = [
    { id: 1, name: "Ankit Sharma", email: "ankit@logihub.com", role: "Transporter" },
    { id: 2, name: "Riya Patel", email: "riya@logihub.com", role: "Customer" },
    { id: 3, name: "Admin User", email: "admin@logihub.com", role: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-slate-100 text-gray-600 border-r border-gray-200 shadow-xl">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MdOutlineLocalShipping className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LogiHub</h1>
              <p className="text-sm text-slate-400">Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: MdDashboard },
              { id: "users", label: "User Management", icon: MdPeople },
              { id: "roles", label: "Roles & Permissions", icon: MdAssignmentInd },
              { id: "analytics", label: "Analytics", icon: MdAnalytics },
              { id: "settings", label: "Settings", icon: MdSettings },
              { id: "security", label: "Security", icon: MdSecurity },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-2 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg text-gray-100"
                    : "hover:bg-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
         <div className="absolute bottom-4 left-4 right-4">
          <div className=" rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-cent600text-gray-800  font-semibold">
              R
            </div>
            <div>
              <p className="font-medium">Rajesh (Admin)</p>
              <p className="text-sm text-slate-400">admin@logihub.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <h1 className="text-xl font-bold text-slate-800 bg-white shadow px-6 py-4 sticky top-0 z-40">Admin Control Panel</h1>

        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg mb-2">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg mb-2">Active Roles</h2>
              <p className="text-3xl font-bold text-green-600">{roles.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg mb-2">System Status</h2>
              <p className="text-3xl font-bold text-yellow-600">Stable</p>
            </div>
          </div>
        )}

        {/* User Management Section */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <table className="w-full border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-slate-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 font-medium text-blue-600">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Roles & Permissions Section */}
        {activeTab === "roles" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Roles & Permissions</h2>
            {roles.map((role) => (
              <div key={role.id} className="border border-slate-200 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-slate-800">{role.name}</h3>
                <ul className="list-disc ml-5 text-slate-600 mt-2">
                  {role.permissions.map((perm, i) => (
                    <li key={i}>{perm}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === "analytics" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-slate-600">Insights on user growth, platform performance, and system metrics will appear here.</p>
          </div>
        )}

        {/* Settings Section */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p className="text-slate-600">Modify platform configurations and system preferences.</p>
          </div>
        )}

        {/* Security Section */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Security Management</h2>
            <p className="text-slate-600">Enable 2FA, manage admin access, and monitor login activity.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;