"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { MdAdd, MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransporterHeader from "@/components/transporter/TransporterHeader";


interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
  capacity: number;
  status: string;
  transporterId: number;
}

const statusColors: Record<string, string> = {
  AVAILABLE: "bg-green-600",
  ON_ROUTE: "bg-red-600",
  UNAVAILABLE: "bg-yellow-500",
  MAINTENANCE: "bg-orange-500",
};

// --- Modal ---
const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
    <div className="bg-[#1e1e2d] rounded-2xl shadow-xl p-6 w-[90%] max-w-lg relative text-white">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        <MdClose size={24} />
      </button>
      <h3 className="text-xl font-semibold mb-6 text-center">{title}</h3>
      {children}
    </div>
  </div>
);

export default function FleetTracking(
 ) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [vehicleModels, setVehicleModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [transporterId, setTransporterId] = useState<number | null>(null);
  const [username, setUsername] = useState("Transporter");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
   const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });
   useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "sidebarCollapsed") {
        setSidebarCollapsed(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handler);
    const sameTabHandler = (ev: Event) => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", sameTabHandler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("storage", sameTabHandler);
    };
  }, []);

 const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    capacity: 0,
    status: "AVAILABLE",
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [typesRes, modelsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/vehicles/api/vehicle/types"),
          axios.get("http://localhost:8080/api/vehicles/api/vehicle/models"),
        ]);
        setVehicleTypes(typesRes.data);
        setVehicleModels(modelsRes.data);
      } catch {
        toast.error("Failed to load vehicle types/models");
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const fetchTransporter = async () => {
      const email = localStorage.getItem("email");
      if (!email) return toast.error("Session expired. Please log in again.");
      try {
        const res = await axios.get(
          `http://localhost:8080/api/transporters/by-email?email=${email}`
        );
        const transporter = res.data;
        setTransporterId(transporter.id);
        setUsername(transporter.contactPersonName || "Transporter");
        fetchVehicles(transporter.id);
      } catch {
        toast.error("Failed to fetch transporter data");
      }
    };
    fetchTransporter();
  }, []);

  const fetchVehicles = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/vehicles/transporter/${id}`
      );
      setVehicles(res.data);
    } catch {
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!transporterId) return;
    const payload = { ...form, transporterId };
    try {
      if (editingVehicle) {
        await axios.put(
          `http://localhost:8080/api/vehicles/${editingVehicle.id}`,
          payload
        );
        toast.success("Vehicle updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/vehicles/add", payload);
        toast.success("Vehicle added successfully!");
      }
      setIsModalOpen(false);
      setEditingVehicle(null);
      fetchVehicles(transporterId);
    } catch {
      toast.error("Failed to save vehicle data");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${id}`);
      transporterId && fetchVehicles(transporterId);
      toast.success("Vehicle deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (v: Vehicle) => {
    setEditingVehicle(v);
    setForm({
      vehicleNumber: v.vehicleNumber,
      vehicleType: v.vehicleType,
      model: v.model,
      capacity: v.capacity,
      status: v.status,
    });
    setIsModalOpen(true);
  };

  const totalVehicles = vehicles.length;
  const available = vehicles.filter((v) => v.status === "AVAILABLE").length;
  const onRoute = vehicles.filter((v) => v.status === "ON_ROUTE").length;
  const unavailable = vehicles.filter((v) => v.status === "UNAVAILABLE").length;

  return (
    <div
    style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen p-0 bg-gray-50  dark:bg-background transition-colors duration-300"
    >
      <TransporterHeader />

      <div className="p-6 space-y-8">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fleet Management </h1>
          <button
            onClick={() => {
              setEditingVehicle(null);
              setForm({
                vehicleNumber: "",
                vehicleType: "",
                model: "",
                capacity: 0,
                status: "AVAILABLE",
              });
              setIsModalOpen(true);
            }}
            className="bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center gap-2"
          >
            <MdAdd size={20} /> Add Vehicles
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gray-100 dark:bg-card rounded-xl p-4 shadow-lg">
            <p className="text-gray-400">Total Vehicles</p>
            <h2 className="text-2xl font-semibold">{totalVehicles}</h2>
          </div>
          <div className="bg-gray-100 dark:bg-card rounded-xl p-4 shadow-lg">
            <p className="text-gray-400">Available</p>
            <h2 className="text-2xl font-semibold">{available}</h2>
          </div>
          <div className="bg-gray-100 dark:bg-card rounded-xl p-4 shadow-lg">
            <p className="text-gray-400">On Route</p>
            <h2 className="text-2xl font-semibold">{onRoute}</h2>
          </div>
           <div className="bg-gray-100 dark:bg-card rounded-xl p-4 shadow-lg">
            <p className="text-gray-400">Unavailable</p>
            <h2 className="text-2xl font-semibold">{unavailable}</h2>
          </div>
          
        </div>

   {/* Vehicles Table */}
<div className="bg-gray-100 dark:bg-card rounded-xl p-5 border border-gray-700 shadow-lg overflow-x-auto">
  {loading ? (
    <p className="text-center text-gray-500">Loading vehicles...</p>
  ) : vehicles.length === 0 ? (
    <p className="text-center text-gray-500">No vehicles added yet.</p>
  ) : (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs">
          <th className="px-4 py-3 text-left">Vehicle Number</th>
          <th className="px-4 py-3 text-left">Type</th>
          <th className="px-4 py-3 text-left">Model</th>
          <th className="px-4 py-3 text-left">Capacity</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v, i) => (
          <tr
            key={v.id}
            className={`${
              i % 2 === 0
                ? "bg-white dark:bg-background"
                : "bg-gray-50 dark:bg-gray-900"
            } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
          >
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{v.vehicleNumber}</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{v.vehicleType}</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{v.model}</td>
            <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{v.capacity} Tons</td>
            <td className="px-4 py-3">
              <span
                className={`px-3 py-1 text-xs rounded-full ${statusColors[v.status]} capitalize`}
              >
                {v.status.replace("_", " ")}
              </span>
            </td>
            <td className="px-4 py-3 flex justify-center gap-2">
              <button
                onClick={() => handleEdit(v)}
                className="bg-violet-700 text-white px-3 py-1 rounded hover:bg-violet-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(v.id)}
                className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


        {isModalOpen && (
          <Modal
            title={editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
            onClose={() => setIsModalOpen(false)}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Vehicle Number"
                value={form.vehicleNumber}
                onChange={(e) =>
                  setForm({ ...form, vehicleNumber: e.target.value })
                }
                required
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              />
              <select
                value={form.vehicleType}
                onChange={(e) =>
                  setForm({ ...form, vehicleType: e.target.value })
                }
                required
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              >
                <option value="">Select Vehicle Type</option>
                {vehicleTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                required
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              >
                <option value="">Select Model</option>
                {vehicleModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Capacity (Tons)"
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: Number(e.target.value) })
                }
                required
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              >
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="ON_ROUTE">ON_ROUTE</option>
                <option value="UNAVAILABLE">UNAVAILABLE</option>
              </select>
              <button
                type="submit"
                className="w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-700"
              >
                {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
              </button>
            </form>
          </Modal>
        )}

        {/* Toast Notification */}
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
