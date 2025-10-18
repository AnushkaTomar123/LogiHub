"use client";

import CustomerHeader from "@/components/customer/Customerheader";
import { useEffect, useState } from "react";
import { FaTruck, FaMapMarkerAlt, FaFileInvoice, FaHeadset } from "react-icons/fa";

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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) {
      setUser({ username, email, role });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-2">
      <CustomerHeader/>
      {/* Quick Actions */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 py-4">
        {[
          { title: "Book Vehicle", desc: "AI-based pricing & instant booking.", icon: <FaTruck className="text-blue-500 text-xl" /> },
          { title: "Track Shipment", desc: "Live location tracking & delivery ETA.", icon: <FaMapMarkerAlt className="text-blue-500 text-xl" /> },
          { title: "Billing History", desc: "View & download past invoices.", icon: <FaFileInvoice className="text-blue-500 text-xl" /> },
          { title: "Support", desc: "Get help or raise a ticket.", icon: <FaHeadset className="text-blue-500 text-xl" /> },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all">
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
      <section className="bg-white rounded-2xl p-5 shadow-md">
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
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100/50 transition">
                  <td className="p-3 text-gray-800">{order.transporter}</td>
                  <td className="p-3 text-gray-800">₹{order.price.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "In Transit"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
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
    </div>
  );
}
