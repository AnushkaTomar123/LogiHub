"use client";

import { useEffect, useState } from "react";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaHeadset,
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
} from "react-icons/fa";
import {MdOutlineLocalShipping} from "react-icons/md";

interface Order {
  id: string;
  transporter: string;
  price: number;
  status: "Pending" | "In Transit" | "Delivered";
  eta: string;
}


interface User {
  username: string;
  email: string;
  role: string;
}

export default function CustomerDashboard() {

  const [orders] = useState<Order[]>([
    { id: "1", transporter: "Raj Logistics", price: 14500, status: "Delivered", eta: "2 Days" },
    { id: "2", transporter: "FastWay Transports", price: 16200, status: "In Transit", eta: "1 Day" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [user, setUser] = useState<User | null>(null);

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, href: "#" },
    { label: "Book Vehicle", icon: <FaTruck />, href: "#book" },
    { label: "Track Shipment", icon: <FaMapMarkerAlt />, href: "#track" },
    { label: "My Orders", icon: <FaClipboardList />, href: "#orders" },
    { label: "Billing", icon: <FaFileInvoice />, href: "#billing" },
    { label: "Support", icon: <FaHeadset />, href: "#support" },
  ];

  useEffect(() => {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  if (username && email && role) {
    setUser({ username, email, role });
  }
}, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login"; // redirect to login
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-100 border-r border-gray-200 shadow-sm transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 z-50 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
           <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <MdOutlineLocalShipping className="w-6 h-6" />
                      </div>
          <div>
            <h1 className="text-xl font-bold">LogiHub</h1>
            <p className="text-sm text-gray-400">Customer Panel</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col mt-4 space-y-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all
              ${
                activeItem === item.label
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-gray-100 shadow-lg"
                  : "hover:bg-slate-200"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="absolute bottom-4 left-0 w-full px-4 text-center">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 shadow-sm">
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-semibold">
                {user ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <p className="font-medium text-gray-800 text-sm">
                 {user ? `${user.username} (${user.role})` : "User (Customer)"}
              </p>
              <p className="text-xs text-gray-400">
                {user ? user.email : "user@example.com"}
              </p>
            </div>
          </div>
          <button
           onClick={handleLogout}
          className="mt-3 flex item-center text-sm text-blue-500 hover:text-red-600 transition px-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Navbar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-700"
            >
              <FaBars size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">Customer Dashboard</h2>
          </div>

          <FaUserCircle className="text-2xl text-gray-600" />
        </header>

        {/* Dashboard Body */}
        <main className="p-6">
          {/* Quick Actions */}
          <section id="actions" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Book Vehicle",
                desc: "AI-based pricing & instant booking.",
                icon: <FaTruck className="text-blue-500 text-xl" />,
              },
              {
                title: "Track Shipment",
                desc: "Live location tracking & delivery ETA.",
                icon: <FaMapMarkerAlt className="text-blue-500 text-xl" />,
              },
              {
                title: "Billing History",
                desc: "View & download past invoices.",
                icon: <FaFileInvoice className="text-blue-500 text-xl" />,
              },
              {
                title: "Support",
                desc: "Get help or raise a ticket.",
                icon: <FaHeadset className="text-blue-500 text-xl" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h2 className="font-semibold text-gray-800">{item.title}</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                  Open
                </button>
              </div>
            ))}
          </section>

          {/* Orders Table */}
          <section id="orders" className="bg-white rounded-2xl p-5 shadow-md mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">My Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="p-3">Transporter</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100/50 transition"
                    >
                      <td className="p-3 text-gray-800">{order.transporter}</td>
                      <td className="p-3 text-gray-800">₹{order.price.toLocaleString()}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "In Transit"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-800">{order.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
