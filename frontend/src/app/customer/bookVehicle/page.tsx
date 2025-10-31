"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdLocalShipping } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function BookVehiclePage() {
  const [formData, setFormData] = useState({
    customerId: "",
    pickupAddress: "",
    dropAddress: "",
    pickupDate: "",
    deliveryDate: "",
    estimatedDistanceKm: "",
    estimatedCost: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Prepare request body
      const payload = {
        ...formData,
        customerId: Number(formData.customerId),
        estimatedDistanceKm: Number(formData.estimatedDistanceKm),
        estimatedCost: Number(formData.estimatedCost),
      };

      const res = await axios.post("http://localhost:8080/api/bookings/request", payload);

      toast.success("Booking request submitted successfully!");
      console.log("Booking Response:", res.data);

      // Reset form
      setFormData({
        customerId: "",
        pickupAddress: "",
        dropAddress: "",
        pickupDate: "",
        deliveryDate: "",
        estimatedDistanceKm: "",
        estimatedCost: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking!");
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Drop Address */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Drop Address</label>
            <input
              type="text"
              name="dropAddress"
              value={formData.dropAddress}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pickup Date</label>
            <input
              type="datetime-local"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Date</label>
            <input
              type="datetime-local"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Estimated Distance */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Distance (km)</label>
            <input
              type="number"
              step="0.1"
              name="estimatedDistanceKm"
              value={formData.estimatedDistanceKm}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Fare (₹)</label>
            <input
              type="number"
              step="0.1"
              name="estimatedCost"
              value={formData.estimatedCost}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
