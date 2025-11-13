"use client";

import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import axios from "axios";

export default function AddShipmentButton() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    pickupAddress: "",
    dropAddress: "",
    goodsDescription: "",
    vehicleType: "",
    pickupDate: "",
    expectDeliveryDate: "",
    capacity: "",
    estimatedCost: "",
  });

  // 🔹 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/bookings", formData);
      alert("Shipment added successfully!");
      setShowModal(false);
      setFormData({
        pickupAddress: "",
        dropAddress: "",
        goodsDescription: "",
        vehicleType: "",
        pickupDate: "",
        expectDeliveryDate: "",
        capacity: "",
        estimatedCost: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add shipment");
    }
  };

  return (
    <>
      {/* 🔘 Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-violet-600 text-white px-5 py-3 rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
      >
        <MdAdd size={24} /> Add Shipment
      </button>

      {/* 🔘 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <MdClose size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Add New Shipment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { name: "pickupAddress", label: "Pickup Address" },
                { name: "dropAddress", label: "Drop Address" },
                { name: "goodsDescription", label: "Commodity / Goods" },
                { name: "vehicleType", label: "Vehicle Type" },
                { name: "pickupDate", label: "Pickup Date", type: "date" },
                {
                  name: "expectDeliveryDate",
                  label: "Expected Delivery Date",
                  type: "date",
                },
                { name: "capacity", label: "Weight (in Tons)" },
                { name: "estimatedCost", label: "Estimated Cost (₹)" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700"
                >
                  Add Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
