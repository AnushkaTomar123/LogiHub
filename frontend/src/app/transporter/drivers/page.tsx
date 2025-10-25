"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDeleteForever, MdClose, MdPeople, MdVisibility } from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";

interface Driver {
  id: number;
  driverName: string;
  licenseNumber: string;
  phoneNumber: string;
  transporterId?: number;
}

export default function DriverManagement() {
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [newDriver, setNewDriver] = useState({
    driverName: "",
    licenseNumber: "",
    phoneNumber: "",
  });
  const [transporterId, setTransporterId] = useState<number | null>(null);

  // ✅ Fetch Transporter by Email
  useEffect(() => {
    const fetchTransporterByEmail = async () => {
      const email = localStorage.getItem("email");
      if (!email) {
        alert("Email not found in localStorage. Please log in again.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:8080/api/transporters/by-email?email=${email}`
        );
        console.log("✅ Transporter fetched:", res.data);
        const id = res.data.id;
        setTransporterId(id);
        localStorage.setItem("transporterId", id.toString());
      } catch (err) {
        console.error("❌ Error fetching transporter:", err);
        alert("Failed to fetch transporter details.");
      }
    };

    fetchTransporterByEmail();
  }, []);

  // ✅ Fetch Drivers when transporterId is ready
  useEffect(() => {
    if (transporterId) fetchDrivers(transporterId);
  }, [transporterId]);

  const fetchDrivers = async (id: number) => {
    try {
      const res = await axios.get<Driver[]>(
        `http://localhost:8080/api/transporters/drivers/${id}`
      );
      setDriverList(res.data);
      console.log("✅ Drivers fetched:", res.data);
    } catch (err) {
      console.error("❌ Error fetching drivers:", err);
    }
  };

  // ✅ Add Driver
  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = transporterId || Number(localStorage.getItem("transporterId"));
    if (!id) {
      alert("Transporter ID not found yet. Please wait.");
      return;
    }

    const driverToAdd = { ...newDriver, transporterId: id };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/transporters/drivers/add",
        driverToAdd,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("✅ Driver added:", res.data);
      fetchDrivers(id);
      setShowAddModal(false);
      setNewDriver({ driverName: "", licenseNumber: "", phoneNumber: "" });
    } catch (err) {
      console.error("❌ Error adding driver:", err);
      alert("Failed to add driver.");
    }
  };

  // ✅ Delete Driver
  const confirmRemoveDriver = async () => {
    if (!selectedDriver) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/transporters/drivers/${selectedDriver.id}`
      );
      console.log("🗑️ Driver deleted!");
      if (transporterId) fetchDrivers(transporterId);
      setShowRemove(false);
      setSelectedDriver(null);
    } catch (err) {
      console.error("❌ Error deleting driver:", err);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <TransporterHeader />

      <div className="flex items-center justify-between mb-8 px-2 py-3">
        <h1 className="text-2xl font-bold text-gray-800">Driver Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
        >
          <MdPeople size={20} /> Add New Driver
        </button>
      </div>

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

              <p className="flex items-center gap-2 text-gray-700 text-sm">
                <FaPhoneAlt className="text-green-500" /> {driver.phoneNumber}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setSelectedDriver(driver);
                    setShowProfile(true);
                  }}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition-all text-sm font-medium flex items-center justify-center gap-1"
                >
                  <MdVisibility size={18} /> View Profile
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
          <p className="text-gray-500 col-span-full text-center">
            No drivers found.
          </p>
        )}
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
              <input
                type="text"
                placeholder="Driver Name"
                value={newDriver.driverName}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, driverName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="License Number"
                value={newDriver.licenseNumber}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newDriver.phoneNumber}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, phoneNumber: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

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

      {/* View Profile Modal */}
      {showProfile && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Driver Profile
            </h3>
            <div className="flex flex-col items-center text-gray-700">
              <Image
                src={`https://i.pravatar.cc/150?u=${selectedDriver.id}`}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mb-4 border"
              />
              <p><strong>Name:</strong> {selectedDriver.driverName}</p>
              <p><strong>License No:</strong> {selectedDriver.licenseNumber}</p>
              <p><strong>Phone:</strong> {selectedDriver.phoneNumber}</p>
            </div>
          </div>
        </div>
      )}

      {/* Remove Driver Modal */}
      {showRemove && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center relative">
            <button
              onClick={() => setShowRemove(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">
              Remove {selectedDriver.driverName}?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmRemoveDriver}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowRemove(false)}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400"
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
