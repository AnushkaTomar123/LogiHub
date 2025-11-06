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

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) {
        toast.error("Customer not found! Please login again.");
        setLoading(false);
        return;
      }

      // Prepare payload (convert fields to correct types)
      const payload = {
        customerId: Number(customerId),
        pickupAddress: formData.pickupAddress.trim(),
        dropAddress: formData.dropAddress.trim(),
        expectDeliveryDate: formData.expectDeliveryDate, // LocalDate (YYYY-MM-DD)
        goodsDescription: formData.goodsDescription.trim(),
        estimatedCost: Number(formData.estimatedCost),
        vehicalType: formData.vehicalType,
        bookingStatus: formData.bookingStatus,
      };

      const res = await axios.post("http://localhost:8080/api/bookings/create", payload);
      console.log("Booking created:", res.data);
      toast.success("✅ Booking created successfully!");

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
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast.error(error.response?.data?.message || "❌ Failed to create booking!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-10 px-4"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-lg text-white">
            <MdLocalShipping size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Book a Vehicle</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Pickup Address */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Pickup Address
            </label>
            <input
              type="text"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={255}
              placeholder="Enter pickup address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Drop Address */}
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Drop Address
            </label>
            <input
              type="text"
              name="dropAddress"
              value={formData.dropAddress}
              onChange={handleChange}
              required
              minLength={5}
              maxLength={255}
              placeholder="Enter drop location"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Expected Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Expected Delivery Date
            </label>
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
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Goods Description
            </label>
            <input
              type="text"
              name="goodsDescription"
              value={formData.goodsDescription}
              onChange={handleChange}
              required
              placeholder="e.g., Electronics, Furniture"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Estimated Cost (₹)
            </label>
            <input
              type="number"
              name="estimatedCost"
              value={formData.estimatedCost}
              onChange={handleChange}
              required
              min={1}
              placeholder="Enter estimated cost"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Vehicle Type
            </label>
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

          {/* Booking Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Booking Status
            </label>
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
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-2 rounded-lg font-semibold transition-all`}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
