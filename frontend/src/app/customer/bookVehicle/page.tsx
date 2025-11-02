"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdLocalShipping } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function BookVehiclePage() {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    expectDeliveryDate: "",
    goodsDescription: "",
    estimatedCost: "",
    vehicalType: "TRUCK",
    bookingStatus: "PENDING",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);

    // Get customerId from localStorage
    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      toast.error("Customer not found! Please login again.");
      setLoading(false);
      return;
    }
    
console.log("Customer ID from localStorage:", customerId);


    const payload = {
      pickupAddress: formData.pickupAddress,
      dropAddress: formData.dropAddress,
      expectDeliveryDate: formData.expectDeliveryDate,
      goodsDescription: formData.goodsDescription,
      estimatedCost: Number(formData.estimatedCost),
      vehicalType: formData.vehicalType,
      bookingStatus: formData.bookingStatus,
      customerId: Number(customerId), // Add customer ID here
    };

    const res = await axios.post("http://localhost:8080/api/bookings/create", payload);

    toast.success("Booking created successfully!");
    console.log("Booking Response:", res.data);

    // Reset form
    setFormData({
      pickupAddress: "",
      dropAddress: "",
      expectDeliveryDate: "",
      goodsDescription: "",
      estimatedCost: "",
      vehicalType: "TRUCK",
      bookingStatus: "PENDING",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    toast.error("Failed to create booking!");
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <MdLocalShipping size={22} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Book a Vehicle</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pickup Address</label>
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
              placeholder="Enter pickup location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Drop Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Address</label>
            <input
              type="text"
              name="dropAddress"
              value={formData.dropAddress}
              onChange={handleChange}
              required
              placeholder="Enter delivery location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Expected Delivery Date (calendar input) */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Expected Delivery Date</label>
            <input
              type="date"
              name="expectDeliveryDate"
              value={formData.expectDeliveryDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Goods Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Goods Description</label>
            <input
              type="text"
              name="goodsDescription"
              value={formData.goodsDescription}
              onChange={handleChange}
              required
              placeholder="e.g., Furniture, Electronics"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Cost (₹)</label>
            <input
              type="number"
              name="estimatedCost"
              value={formData.estimatedCost}
              onChange={handleChange}
              required
              placeholder="Enter estimated fare"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Vehicle Type from Enum */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Vehicle Type</label>
            <select
              name="vehicalType"
              value={formData.vehicalType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="TRUCK">Truck</option>
              <option value="TRAILER">Trailer</option>
              <option value="VAN">Van</option>
              <option value="MINI_TRUCK">Mini Truck</option>
              <option value="PICKUP">Pickup</option>
              <option value="TEMPO">Tempo</option>
            </select>
          </div>

          {/* Booking Status from Enum */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Booking Status</label>
            <select
              name="bookingStatus"
              value={formData.bookingStatus}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-150"
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
