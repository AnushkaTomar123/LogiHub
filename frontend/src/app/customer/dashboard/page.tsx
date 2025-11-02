"use client";

import CustomerHeader from "@/components/customer/Customerheader";
import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  expectDeliveryDate: string;
  goodsDescription: string;
  estimatedCost: number;
  vehicalType: string;
  bookingStatus: string;
}

interface User {
  username: string;
  email: string;
  role: string;
}

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");

    if (storedUsername && storedEmail && storedRole) {
      setUser({ username: storedUsername, email: storedEmail, role: storedRole });
    }

    const fetchCustomerAndOrders = async () => {
      if (!storedEmail) {
        console.error("❌ Email not found in localStorage");
        return;
      }

      try {
        // 1️⃣ Get customer by email
        const customerRes = await axios.get(
          `http://localhost:8080/api/customers/by-email?email=${storedEmail}`
        );
        console.log("✅ Customer API Response:", customerRes); // Full response
        const customerId = customerRes.data.id;
        console.log("👤 Customer ID:", customerId);

        // 2️⃣ Get bookings by customer ID
        const ordersRes = await axios.get(
          `http://localhost:8080/api/bookings/customer/${customerId}`
        );
        console.log("📦 Orders API Response:", ordersRes); // Full response
        console.log("Orders data:", ordersRes.data);

        setOrders(ordersRes.data);
      } catch (err: any) {
        console.error("❌ Error fetching customer or orders:", err);
        if (err.response) {
          console.error("❌ Backend response:", err.response.data);
          console.error("❌ Status code:", err.response.status);
        }
      }
    };

    fetchCustomerAndOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-2">
      <CustomerHeader />
      <section className="bg-white rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">My Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-3">Pickup</th>
                <th className="p-3">Drop</th>
                <th className="p-3">Goods</th>
                <th className="p-3">Price</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Status</th>
                <th className="p-3">ETA</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100/50 transition">
                  <td className="p-3">{order.pickupAddress}</td>
                  <td className="p-3">{order.dropAddress}</td>
                  <td className="p-3">{order.goodsDescription}</td>
                  <td className="p-3">₹{order.estimatedCost}</td>
                  <td className="p-3">{order.vehicalType}</td>
                  <td className="p-3">{order.bookingStatus}</td>
                  <td className="p-3">{order.expectDeliveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
