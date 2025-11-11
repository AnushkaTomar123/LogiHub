"use client";

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

export default function OrderCard({ order }: { order: Order }) {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "COMPLETED":
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "AWAITING_PAYMENT":
        return "bg-orange-100 text-orange-800";
      case "ACCEPTED":
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleView = (id: number) => {
    window.location.href = `/customer/orders/${id}`;
  };

  const handleTrack = (id: number) => {
    window.location.href = `/customer/track/${id}`;
  };

  const handlePay = async (bookingId: number, halfAmount: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bookings/payment/half",
        { bookingId, halfAmount }
      );
      if (response.status === 200) {
        alert("Half payment successful ✅");
        window.location.reload();
      }
    } catch {
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{order.goodsDescription}</h2>
        <span
          className={`px-3 py-1 text-sm rounded-full font-semibold ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.replace("_", " ")}
        </span>
      </div>

      <p><span className="font-semibold">Pickup:</span> {order.pickupAddress}</p>
      <p><span className="font-semibold">Drop:</span> {order.dropAddress}</p>
      <p><span className="font-semibold">Vehicle:</span> {order.vehicleType}</p>
      <p><span className="font-semibold">Cost:</span> ₹{order.estimatedCost}</p>
      <p>
        <span className="font-semibold">Expected Delivery:</span>{" "}
        {order.expectDeliveryDate
          ? new Date(order.expectDeliveryDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A"}
      </p>

      <div className="flex gap-3 mt-4 flex-wrap">
        <button
          onClick={() => handleView(order.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View
        </button>

        {order.status === "AWAITING_PAYMENT" && (
          <button
            onClick={() => handlePay(order.id, order.estimatedCost / 2)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Pay ₹{(order.estimatedCost / 2).toLocaleString()}
          </button>
        )}

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
  );
}
