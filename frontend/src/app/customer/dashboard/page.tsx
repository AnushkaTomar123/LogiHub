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

  // ✅ Fetch username & customerId from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

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
        .catch((err) => console.error("Error fetching customer by email:", err));
    }
  }, []);

  // ✅ Fetch orders for this customer
  useEffect(() => {
    if (!customerId) return;
    axios
      .get(`http://localhost:8080/api/bookings/customer/${customerId}`)
      .then((res) => {
        if (Array.isArray(res.data)) setOrders(res.data);
        else setOrders([]);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, [customerId]);

  const totalOrders = orders.length;

  // ✅ Set color badge based on booking status
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "AWAITING_PAYMENT":
        return "bg-orange-100 text-orange-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // ✅ View button action
  const handleView = (bookingId: number) => {
    window.location.href = `/customer/orders/${bookingId}`;
  };

  // ✅ Pay button action — API call for half payment
  const handlePay = async (bookingId: number, halfAmount: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bookings/payment/half",
        {
          bookingId: bookingId,
          halfAmount: halfAmount,
        }
      );

      if (response.status === 200) {
        alert("Half payment successful ✅");
        // Update order status
        setOrders((prev) =>
          prev.map((o) =>
            o.id === bookingId ? { ...o, status: "ACCEPTED" } : o
          )
        );
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // ✅ Track button action
  const handleTrack = (bookingId: number) => {
    window.location.href = `/customer/track/${bookingId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300 px-4 py-6">
      <CustomerHeader />

      <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Welcome, {userName} ({customerId}) — Total Orders: {totalOrders}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 border border-gray-200 dark:border-gray-700 transition hover:scale-105"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{order.goodsDescription}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.replace("_", " ")}
                </span>
              </div>

              {/* Booking Info */}
              <p>
                <span className="font-semibold">Pickup:</span>{" "}
                {order.pickupAddress}
              </p>
              <p>
                <span className="font-semibold">Drop:</span>{" "}
                {order.dropAddress}
              </p>
              <p>
                <span className="font-semibold">Vehicle:</span>{" "}
                {order.vehicleType}
              </p>
              <p>
                <span className="font-semibold">Estimated Cost:</span> ₹
                {order.estimatedCost.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Expected Delivery:</span>{" "}
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
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                {/* View button - always visible */}
                <button
                  onClick={() => handleView(order.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View
                </button>

                {/* Pay button - only if Awaiting Payment */}
                {order.status === "AWAITING_PAYMENT" && (
                  <button
                    onClick={() =>
                      handlePay(order.id, order.estimatedCost / 2)
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Pay ₹{(order.estimatedCost / 2).toLocaleString()}
                  </button>
                )}

                {/* Track button - only if Accepted */}
                {order.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleTrack(order.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Track
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
