"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { MdPeople, MdStar, MdClose, MdDelete, MdEdit } from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";

interface Driver {
  id: number;
  driverName: string;
  licenseNumber: string;
  phoneNumber: string;
  transporterId?: number;
  status: "AVAILABLE" | "OFF_DUTY" | "ON_DUTY";
}

export default function DriverManagement() {
  const [driverList, setDriverList] = useState<Driver[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [newDriver, setNewDriver] = useState({
    driverName: "",
    licenseNumber: "",
    phoneNumber: "",
  });
  const [editDriver, setEditDriver] = useState<Driver | null>(null);
  const [transporterId, setTransporterId] = useState<number | null>(null);
 
   const sidebarWidth = sidebarCollapsed ? 80 : 256;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      const handleStorageChange = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  useEffect(() => {
    const fetchTransporterByEmail = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/transporters/by-email?email=${email}`
        );
        setTransporterId(res.data.id);
        localStorage.setItem("transporterId", res.data.id.toString());
      } catch (err) {
        console.error("Error fetching transporter:", err);
      }
    };
    fetchTransporterByEmail();
  }, []);

  const fetchDrivers = async (id: number) => {
    try {
      const res = await axios.get<Driver[]>(
        `http://localhost:8080/api/transporters/drivers/${id}`
      );
      setDriverList(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
    if (transporterId) fetchDrivers(transporterId);
  }, [transporterId]);

  // ✅ Add new driver
  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = transporterId || Number(localStorage.getItem("transporterId"));
    if (!id) return alert("Transporter ID missing");

    const driverToAdd = { ...newDriver, transporterId: id, status: "AVAILABLE" };
    try {
      await axios.post(
        "http://localhost:8080/api/transporters/drivers/add",
        driverToAdd,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("✅ Driver added successfully!");
      setShowAddModal(false);
      setNewDriver({ driverName: "", licenseNumber: "", phoneNumber: "" });
      fetchDrivers(id);
    } catch (err) {
      alert("❌ Failed to add driver");
      console.error(err);
    }
  };

  // 🟡 Update driver
  const handleUpdateDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDriver) return;
    try {
      await axios.put(
        `http://localhost:8080/api/transporters/drivers/${editDriver.id}`,
        editDriver,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("✅ Driver updated successfully!");
      setShowEditModal(false);
      fetchDrivers(transporterId!);
    } catch (err) {
      console.error("Error updating driver:", err);
    }
  };

  // 🔴 Delete driver
  const handleDeleteDriver = async (id: number) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/transporters/drivers/${id}`);
      alert("🗑️ Driver deleted!");
      fetchDrivers(transporterId!);
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  // 🟢 Change Status
  const handleStatusChange = async (driver: Driver, status: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/transporters/drivers/${driver.id}`,
        { ...driver, status },
        { headers: { "Content-Type": "application/json" } }
      );
      fetchDrivers(transporterId!);
    } catch (err) {
      console.error("Error changing status:", err);
    }
  };

  const getStatusColor = (status: Driver["status"]) => {
    switch (status) {
      case "AVAILABLE":
        return "text-green-500 font-medium";
      case "ON_DUTY":
        return "text-yellow-500 font-medium";
      case "OFF_DUTY":
        return "text-red-500 font-medium";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div  style={{
        marginLeft: sidebarWidth,
        transition: "margin-left 300ms ease",
      }} className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100">
      <TransporterHeader />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Driver Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700"
          >
            + Add Driver
          </button>
        </div>

       <div className="bg-white dark:bg-card shadow-lg rounded-xl p-5 border border-gray-200 dark:border-gray-700">
  {driverList.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-background">
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 w-1/5">
              Name
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 w-1/5">
              Status
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 w-1/5">
              Phone
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 w-1/5">
              License
            </th>
            <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 w-1/5">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {driverList.map((d) => (
            <tr
              key={d.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <td className="py-3 px-4 text-gray-800 dark:text-gray-200">
                {d.driverName}
              </td>

              <td className="py-3 px-4">
                <select
                  value={d.status}
                  onChange={(e) => handleStatusChange(d, e.target.value)}
                  className={`bg-transparent border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-violet-500 ${getStatusColor(
                    d.status
                  )}`}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="ON_DUTY">On Duty</option>
                  <option value="OFF_DUTY">Off Duty</option>
                </select>
              </td>

              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                {d.phoneNumber}
              </td>

              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                {d.licenseNumber}
              </td>

              <td className="py-3 px-4 flex justify-center items-center gap-4">
                <button
                  onClick={() => {
                    setSelectedDriver(d);
                    setShowProfile(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setEditDriver(d);
                    setShowEditModal(true);
                  }}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteDriver(d.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center text-gray-500 dark:text-gray-400 py-6">
      No Drivers Found
    </p>
  )}
</div>

      </div>

      {/* ➕ Add Driver Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="Add Driver">
          <form onSubmit={handleAddDriver} className="space-y-4">
            <input
              type="text"
              placeholder="Driver Name"
              value={newDriver.driverName}
              onChange={(e) =>
                setNewDriver({ ...newDriver, driverName: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="License Number"
              value={newDriver.licenseNumber}
              onChange={(e) =>
                setNewDriver({ ...newDriver, licenseNumber: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newDriver.phoneNumber}
              onChange={(e) =>
                setNewDriver({ ...newDriver, phoneNumber: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ✏️ Edit Driver Modal */}
      {showEditModal && editDriver && (
        <Modal onClose={() => setShowEditModal(false)} title="Edit Driver">
          <form onSubmit={handleUpdateDriver} className="space-y-4">
            <input
              type="text"
              value={editDriver.driverName}
              onChange={(e) =>
                setEditDriver({ ...editDriver, driverName: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              value={editDriver.licenseNumber}
              onChange={(e) =>
                setEditDriver({ ...editDriver, licenseNumber: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              value={editDriver.phoneNumber}
              onChange={(e) =>
                setEditDriver({ ...editDriver, phoneNumber: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* 👁️ View Profile Modal */}
      {showProfile && selectedDriver && (
        <Modal onClose={() => setShowProfile(false)} title="Driver Profile">
          <div className="flex flex-col items-center">
            <Image
              src={`https://i.pravatar.cc/150?u=${selectedDriver.id}`}
              alt="Driver"
              width={100}
              height={100}
              className="rounded-full border mb-3"
            />
            <p><b>Name:</b> {selectedDriver.driverName}</p>
            <p><b>License:</b> {selectedDriver.licenseNumber}</p>
            <p><b>Phone:</b> {selectedDriver.phoneNumber}</p>
            <p><b>Status:</b> {selectedDriver.status}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-200"
        >
          <MdClose size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
}
