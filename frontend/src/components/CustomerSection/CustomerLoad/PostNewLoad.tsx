"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MdLocalShipping } from "react-icons/md";

interface Props {
  onClose: () => void;
}

export default function PostNewLoadForm({ onClose }: Props) {
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    expectDeliveryDate: "",
    goodsDescription: "",
    estimatedCost: "",
    pickupDate: "",
    capacity: "",
    vehicleType: "TRUCK",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) {
        toast.error("Customer not found! Please login again.");
        setLoading(false);
        return;
      }

      const payload = {
        customerId: Number(customerId),
        pickupAddress: formData.pickupAddress.trim(),
        dropAddress: formData.dropAddress.trim(),
        expectDeliveryDate: formData.expectDeliveryDate,
        goodsDescription: formData.goodsDescription.trim(),
        estimatedCost: Number(formData.estimatedCost),
        vehicleType: formData.vehicleType,
        pickupDate: formData.pickupDate,
        capacity: Number(formData.capacity),
      };

      await axios.post("http://localhost:8080/api/bookings/create", payload);
      toast.success("✅ Booking created successfully!");
      setFormData({
        pickupAddress: "",
        dropAddress: "",
        expectDeliveryDate: "",
        goodsDescription: "",
        estimatedCost: "",
        pickupDate: "",
        capacity: "",
        vehicleType: "TRUCK",
      });
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "❌ Failed to create booking!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 backdrop-blur flex justify-center items-start pt-20 z-50">
      <div className="bg-white dark:bg-background p-6 rounded-2xl shadow-lg max-w-3xl w-full border border-white dark:border-card">
       
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-300 flex items-center gap-2">
          <MdLocalShipping /> Post New Load
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Inputs same as previous BookVehiclePage */}
          {/* Pickup */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Pickup Address</label>
            <input type="text" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Drop */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Drop Address</label>
            <input type="text" name="dropAddress" value={formData.dropAddress} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Expected Delivery */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Expected Delivery Date</label>
            <input type="date" name="expectDeliveryDate" value={formData.expectDeliveryDate} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Pickup Date</label>
            <input type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Capacity</label>
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Goods */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Goods Description</label>
            <input type="text" name="goodsDescription" value={formData.goodsDescription} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Estimated Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Estimated Cost (₹)</label>
            <input type="number" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300" />
          </div>
          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-gray-300">
              <option value="TRUCK">Truck</option>
              <option value="TRAILER">Trailer</option>
              <option value="VAN">Van</option>
              <option value="MINI_TRUCK">Mini Truck</option>
              <option value="PICKUP">Pickup</option>
              <option value="TEMPO">Tempo</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-between mt-4">
            <button type="submit" disabled={loading} className={`px-6 py-2 rounded-lg font-semibold text-white ${loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"}`}>
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
             <button onClick={onClose} className="px-6 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white ">
          Close
        </button>
          </div>
        </form>
      </div>
    </div>
  );
}
