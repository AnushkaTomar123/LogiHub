"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  FaPhoneAlt,
  FaIdCard,
} from "react-icons/fa";
import {
  MdDeleteForever,
  MdClose,
  MdPeople,
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";

export default function DriverManagement() {
  const [driverList, setDriverList] = useState<any[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  // Form state for adding a new driver
  const [newDriver, setNewDriver] = useState({
    driverName: "",
    licenseNumber: "",
    phoneNumber: "",
    transporterId: 1, // later dynamically fetched from login
  });

  // ✅ Fetch all drivers on mount
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/drivers/all");
      setDriverList(res.data);
    } catch (err) {
      console.error("❌ Error fetching drivers:", err);
    }
  };

  // ✅ Add new driver
  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/drivers/add", newDriver, {
        headers: { "Content-Type": "application/json" },
      });
      fetchDrivers();
      setShowAddModal(false);
      setNewDriver({ driverName: "", licenseNumber: "", phoneNumber: "", transporterId: 1 });
    } catch (err) {
      console.error("❌ Error adding driver:", err);
    }
  };

  // ✅ Delete driver
  const confirmRemoveDriver = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/drivers/${selectedDriver.id}`);
      fetchDrivers();
      setShowRemove(false);
      setSelectedDriver(null);
    } catch (err) {
      console.error("❌ Error deleting driver:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <TransporterHeader />

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8 px-6 pt-6">
        <h1 className="text-3xl font-bold text-gray-800">Driver Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
        >
          <MdPeople size={20} /> Add New Driver
        </button>
      </div>

      {/* ✅ Driver Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-10">
        {driverList.length > 0 ? (
          driverList.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-blue-500 p-5"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={`https://i.pravatar.cc/150?u=${driver.id}`}
                  alt={driver.driverName}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-gray-300 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {driver.driverName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    License: {driver.licenseNumber}
                  </p>
                </div>
              </div>

              <div className="text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-green-500" /> {driver.phoneNumber}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowProfile(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all text-sm font-medium"
                >
                  View Profile
                </button>

                <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowRemove(true);
                  }}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-all text-sm font-medium flex items-center justify-center gap-1"
                >
                  <MdDeleteForever size={18} /> Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No drivers found.</p>
        )}
      </div>

      {/* ✅ Add New Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Add New Driver
            </h3>

            <form onSubmit={handleAddDriver} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Driver Name
                </label>
                <input
                  type="text"
                  placeholder="Enter driver name"
                  value={newDriver.driverName}
                  onChange={(e) =>
                    setNewDriver({ ...newDriver, driverName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  type="text"
                  placeholder="Enter license number"
                  value={newDriver.licenseNumber}
                  onChange={(e) =>
                    setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={newDriver.phoneNumber}
                  onChange={(e) =>
                    setNewDriver({ ...newDriver, phoneNumber: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Profile Modal */}
      {showProfile && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <div className="text-center">
              <Image
                src={`https://i.pravatar.cc/150?u=${selectedDriver.id}`}
                alt={selectedDriver.driverName}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-3 border-2 border-gray-200"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedDriver.driverName}
              </h2>
              <p className="text-gray-600 mb-4">
                License: {selectedDriver.licenseNumber}
              </p>
            </div>

            <div className="text-gray-700 space-y-2">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-500" /> Contact:{" "}
                <span className="font-medium">{selectedDriver.phoneNumber}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaIdCard className="text-blue-500" /> ID:{" "}
                <span className="font-medium">{selectedDriver.id}</span>
              </p>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setShowProfile(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Remove Confirmation Modal */}
      {showRemove && selectedDriver && (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Remove Driver?
            </h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-red-600">
                {selectedDriver.driverName}
              </span>
              ?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmRemoveDriver}
                className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowRemove(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
