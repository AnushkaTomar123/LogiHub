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
  vehicleType: string;
  status: string;
}

export default function CustomerDashboard() {
  const [userName, setUsername] = useState("Customer");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ Prevents hydration error

    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      axios
        .get(`http://localhost:8080/api/customers/by-email?email=${storedEmail}`)
        .then((res) => {
          
          const id = res.data.id;
          setCustomerId(id);
          localStorage.setItem("customerId", id.toString());
        })
        .catch((err) =>
          console.error("Error fetching customer by email:", err)
        );
    }
  }, []);

  useEffect(() => {
    if (!customerId) return;
    axios
      .get(`http://localhost:8080/api/bookings/customer/${customerId}`)
      .then((res) => {
        console.log("✅ Backend data:", res.data);
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setOrders([]);
        }
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [customerId]);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-gray-50 px-2">
      <CustomerHeader />
      <section className="bg-white rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {userName} ({customerId}) — Total Orders: {totalOrders}
        </h2>

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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className=" text-gray-900 border-b border-gray-200 hover:bg-gray-100/50 transition"
                  >
                    <td className="p-3">{order.pickupAddress}</td>
                    <td className="p-3">{order.dropAddress}</td>
                    <td className="p-3">{order.goodsDescription}</td>
                    <td className="p-3">₹{order.estimatedCost}</td>
                    <td className="p-3">{order.vehicleType}</td>
<td className="p-3">{order.status}</td>

                    <td className="p-3">
                      {order.expectDeliveryDate
                        ? new Date(order.expectDeliveryDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
