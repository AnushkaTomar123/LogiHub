import React, { useEffect, useState } from "react";
import axios from "axios";

interface CustomerOrder {
  id: number;
  pickupAddress: string;
  dropAddress: string;
  bookingDate: string;
  pickupDate: string;
  deliveryDate: string;
  status: string;
  paymentStatus: string;
  estimatedCost: number;
}

export default function MyOrdersCustomer() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      try {
        setLoading(true);
        const customerId = localStorage.getItem("customerId"); // Logged-in customer ID
        const response = await axios.get(
          `http://localhost:8080/api/bookings/customer/${customerId}`
        );

        const formattedOrders = response.data.map((order: any) => ({
          id: order.id,
          pickupAddress: order.pickupAddress,
          dropAddress: order.dropAddress,
          bookingDate: order.bookingDate
            ? new Date(order.bookingDate).toLocaleDateString("en-IN")
            : "N/A",
          pickupDate: order.pickupDate
            ? new Date(order.pickupDate).toLocaleDateString("en-IN")
            : "N/A",
          deliveryDate: order.deliveryDate
            ? new Date(order.deliveryDate).toLocaleDateString("en-IN")
            : "N/A",
          status: order.status,
          paymentStatus: order.paymentStatus,
          estimatedCost: order.estimatedCost,
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching customer orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">My Orders</h2>
      {orders.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            >
              <p><strong>Booking ID:</strong> {order.id}</p>
              <p><strong>Pickup:</strong> {order.pickupAddress}</p>
              <p><strong>Drop:</strong> {order.dropAddress}</p>
              <p><strong>Booking Date:</strong> {order.bookingDate}</p>
              <p><strong>Pickup Date:</strong> {order.pickupDate}</p>
              <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    order.status === "REQUESTED"
                      ? "text-yellow-600"
                      : order.status === "ACCEPTED"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Estimated Cost:</strong> ₹{order.estimatedCost}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
