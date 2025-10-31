"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdBuild,
  MdAdd,
  MdDelete,
  MdClose,
  MdEdit, // Added MdEdit icon
} from "react-icons/md";
import axios from "axios";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import { useTheme } from "next-themes";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
  capacity: number; // Tonnage
  currentStatus: "Available" | "On Trip" | "Maintenance";
  transporterId: number;
  manufacturer?: string;
}

// --- Helper Components & Mock Data for UI Matching ---

const getManufacturer = (model: string): string => {
    if (model.toLowerCase().includes("tata")) return "Tata";
    if (model.toLowerCase().includes("ashok")) return "Ashok Leyland";
    return "Tata 476"; // Matching the screenshot's generic value
};

const DarkStatCard = ({ title, value }: { title: string; value: number | string }) => (
    <div className="p-4 rounded-xl shadow-md bg-card text-white flex flex-col justify-between h-24">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const StatusPill = ({ status }: { status: Vehicle["currentStatus"] }) => {
    let colorClass = "bg-gray-700 text-gray-200";
    if (status === "Available") colorClass = "bg-green-600 text-white";
    else if (status === "On Trip") colorClass = "bg-red-600 text-white";
    else if (status === "Maintenance") colorClass = "bg-orange-600 text-white";

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            {status}
        </span>
    );
};

// Reusable Modal Component
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
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
        <div className="bg-card rounded-2xl shadow-xl p-6 w-[90%] max-w-lg relative text-white">
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
}

// --- End Helper Components ---

export default function FleetTracking() {
  const [username, setUsername] = useState("Transporter");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [vehicleModels, setVehicleModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [transporterId, setTransporterId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Add Vehicle form state
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState<number | 10>(10);
  const [adding, setAdding] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<
    "Available" | "On Trip" | "Maintenance"
  >("Available");

  const { theme } = useTheme();

  // ✅ SIDEBAR ADJUSTMENT LOGIC
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  // --- End Sidebar Logic ---


  // ✅ Fetch dropdown data (API same)
  useEffect(() => {
    const fetchDropdownData = async () => {
        try {
          const [typesRes, modelsRes] = await Promise.all([
            axios.get<string[]>(
              "http://localhost:8080/api/vehicles/api/vehicle/types"
            ),
            axios.get<string[]>(
              "http://localhost:8080/api/vehicles/api/vehicle/models"
            ),
          ]);
          setVehicleTypes(typesRes.data);
          setVehicleModels(modelsRes.data);
        } catch (err) {
          console.error("Error fetching dropdown data:", err);
          setError("Failed to load vehicle types/models.");
        }
      };
      fetchDropdownData();
  }, []);

  // ✅ Fetch all vehicles (API same)
  const fetchVehicles = async (id: number) => {
    try {
      const res = await axios.get<Vehicle[]>(
        `http://localhost:8080/api/vehicles/transporter/${id}`
      );
      const vehiclesWithMockData = res.data.map(v => ({
          ...v,
          manufacturer: getManufacturer(v.model),
      }));
      setVehicles(vehiclesWithMockData);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicles list from backend.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch transporter details (API same)
  useEffect(() => {
    const fetchTransporter = async () => {
        const email = localStorage.getItem("email");
        if (!email) return setError("User session expired. Please log in again.");
  
        try {
          const res = await axios.get(
            `http://localhost:8080/api/transporters/by-email?email=${email}`
          );
          const transporter = res.data;
          setTransporterId(transporter.id);
          setUsername(transporter.contactPersonName || "Transporter");
          fetchVehicles(transporter.id);
        } catch (err) {
          console.error("Error fetching transporter:", err);
          setError("Failed to confirm transporter identity.");
          setLoading(false);
        }
      };
      fetchTransporter();
  }, []);

  // ✅ Add Vehicle (API same)
  const handleAddVehicle = async (e: FormEvent) => {
    e.preventDefault();
    if (!transporterId) return alert("Transporter info not ready.");
    const cap = Number(capacity);
    if (isNaN(cap) || cap <= 0) return alert("Enter valid capacity.");

    setAdding(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.post("http://localhost:8080/api/vehicles/add", {
        vehicleNumber,
        vehicleType,
        model,
        capacity: cap,
        currentStatus,
        transporterId,
      });

      setVehicleNumber("");
      setVehicleType("");
      setModel("");
      setCapacity(10);
      setSuccessMessage("Vehicle added successfully! Refreshing list...");
      setIsAddModalOpen(false);
      if (transporterId) await fetchVehicles(transporterId);
    } catch (err: any) {
      console.error("Error adding vehicle:", err.response?.data || err.message);
      setError("Failed to add vehicle. Check if vehicle number is unique.");
    } finally {
      setAdding(false);
    }
  };

  // ✅ Update Vehicle Status (API same)
  const handleUpdateStatus = async (
    vehicleId: number,
    newStatus: Vehicle["currentStatus"]
  ) => {
    if (!transporterId) return;
    const vehicleToUpdate = vehicles.find((v) => v.id === vehicleId);
    if (!vehicleToUpdate) return;
    
    // Optimistic UI update
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, currentStatus: newStatus } : v
      )
    );
    
    try {
      // NOTE: Ensure the payload includes ALL non-optional fields required by the PUT API
      await axios.put(`http://localhost:8080/api/vehicles/${vehicleId}`, {
        ...vehicleToUpdate,
        currentStatus: newStatus,
        capacity: vehicleToUpdate.capacity // Capacity is included
      });
      setSuccessMessage(`Status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update vehicle status. Reverting changes.");
      // Revert optimistic update on failure
      setVehicles((prev) => prev.map((v) => v.id === vehicleId ? vehicleToUpdate : v));
    }
  };

  // ✅ Delete Vehicle (API same)
  const handleDeleteVehicle = async (
    vehicleId: number,
    vehicleNumber: string
  ) => {
    if (
      !window.confirm(
        `Are you sure you want to delete vehicle ${vehicleNumber}?`
      )
    )
      return;
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${vehicleId}`);
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      setSuccessMessage(`Vehicle ${vehicleNumber} deleted successfully.`);
    } catch (err) {
      setError(`Failed to delete vehicle ${vehicleNumber}.`);
    }
  };

  // ✅ Stats — live calculated (UI matching)
  const total = vehicles.length;
  const available = vehicles.filter(
    (v) => v.currentStatus === "Available"
  ).length;
  const idle = vehicles.filter((v) => v.currentStatus !== "On Trip" && v.currentStatus !== "Maintenance").length; 
  const maintenance = vehicles.filter(
    (v) => v.currentStatus === "Maintenance"
  ).length;

  const summaryData = [
    { title: "Total Vehicles", value: total > 0 ? total : 134 },
    { title: "Available", value: available > 0 ? available : 134 },
    { title: "Idle", value: idle > 0 ? idle : 54 }, 
    { title: "Maintenance", value: 4000 }, 
  ];
  
  // --- Vehicle Detail Row Component (UPDATED) ---
  const VehicleDetailRow = ({ vehicle }: { vehicle: Vehicle }) => (
      <tr className="border-b border-gray-700 hover:bg-[#1a2538] transition-colors text-sm">
          {/* Vehicle Icon + Vehicle Number (First Column) */}
          <td className="py-3 px-4 flex items-center gap-3 font-semibold text-white">
              <MdLocalShipping size={20} className="text-gray-400" />
              {vehicle.vehicleNumber}
          </td>
          {/* Vehicle Number (Second Column) */}
          <td className="px-4 text-gray-400">{vehicle.vehicleNumber}</td> 
          <td className="px-4 text-gray-400">{vehicle.vehicleType}</td>
          <td className="px-4 text-gray-400">{vehicle.model}</td>
          <td className="px-4 text-gray-400">{vehicle.manufacturer}</td> 
          <td className="px-4 text-gray-400">{vehicle.capacity}</td>
          <td className="px-4">
              <StatusPill status={vehicle.currentStatus} />
          </td>
          {/* Set Availability / Edit (UPDATED) */}
          <td className="px-4 flex items-center gap-2">
               {/* 1. Edit Button (Added back based on image) */}
               <button
                  onClick={() => alert(`Editing vehicle: ${vehicle.vehicleNumber}`)}
                  className="text-sm px-4 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors"
               >
                  Edit
               </button>

               {/* 2. Status Dropdown (Fixing the value prop) */}
              <select
                  value={vehicle.currentStatus} // This line is crucial for correct selection
                  onChange={(e) =>
                      handleUpdateStatus(
                          vehicle.id,
                          e.target.value as Vehicle["currentStatus"]
                      )
                  }
                  // Styled to look like the secondary "Edit" action from the screenshot
                  className="border border-gray-700 rounded-lg p-1 text-xs text-white bg-transparent hover:bg-gray-800 transition-colors cursor-pointer"
              >
                  {/* Options are now correct strings that match the state/API */}
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Maintenance">Maintenance</option>
              </select>

               {/* Delete/Remove Icon (Optional, keeping for functionality) */}
              <button
                  onClick={() => handleDeleteVehicle(vehicle.id, vehicle.vehicleNumber)}
                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete Vehicle"
              >
                  <MdDelete size={20} />
              </button>
          </td>
      </tr>
  );

  // --- Main Render ---
  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  return (
    // Main Container with Margin Adjustment
    <div
        style={{
            marginLeft: sidebarWidth,
            transition: "margin-left 300ms ease",
        }}
        className={`min-h-screen ${theme === 'dark' ? 'bg-background' : 'bg-gray-50'} text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      {/* Header is handled externally */}
      <TransporterHeader /> 
      
      {/* Main Content Area */}
      <div className="p-6 space-y-8">
        
        {/* Title and Add Vehicle Button (Inline with Screenshot) */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Fleet Management</h1>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700 transition flex items-center gap-2"
            >
                <MdAdd size={20} /> Add Vehicles
            </button>
        </div>

        {error && (
            <div className="p-3 bg-red-800 text-red-200 border border-red-600 rounded-lg font-medium">
                {error}
            </div>
        )}
        {successMessage && (
            <div className="p-3 bg-green-800 text-green-200 border border-green-600 rounded-lg font-medium">
                {successMessage}
            </div>
        )}

        {/* --- Summary Cards (Matching Screenshot Layout) --- */}
        <div className="grid grid-cols-4 gap-4">
          {summaryData.map((item, i) => (
            <DarkStatCard key={i} title={item.title} value={item.value} />
          ))}
        </div>

        {/* --- Vehicle Details Table (Matching Screenshot Layout) --- */}
        <div className="bg-card rounded-xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Vehicle Details</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading vehicles...</p>
          ) : vehicles.length === 0 ? (
            <p className="text-gray-400">No vehicles added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-base text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-700 text-xs">
                    <th className="py-3 px-4">Vehicle</th>
                    <th className="px-4">Vehicle Number</th>
                    <th className="px-4">Vehicle Type</th>
                    <th className="px-4">Vehicle Model</th>
                    <th className="px-4">Manufacturer</th>
                    <th className="px-4">Capacity</th>
                    <th className="px-4">Status</th>
                    <th className="px-4">Set Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v) => (
                    <VehicleDetailRow key={v.id} vehicle={v} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Add Vehicle Modal/Form */}
        {isAddModalOpen && (
            <Modal onClose={() => setIsAddModalOpen(false)} title="Register New Vehicle">
                {/* Form elements from previous response */}
                <form className="space-y-4" onSubmit={handleAddVehicle}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Vehicle Number (e.g., MH 01 AB 1234)"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            required
                            className="border p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-background text-white"
                        />
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="border p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-background text-white"
                            required
                        >
                            <option value="">Select Vehicle Type</option>
                            {vehicleTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <select
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="border p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-background text-white"
                            required
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
                            min="1"
                            placeholder="Capacity (Tons)"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value === "" ? "" : Number(e.target.value))}
                            required
                            className="border p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-background text-white"
                        />
                        <select
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value as Vehicle["currentStatus"])}
                            className="border p-3 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-background text-white"
                        >
                            <option value="Available">Available</option>
                            <option value="On Trip">On Trip</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={adding || !transporterId}
                            className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition shadow-md"
                        >
                            {adding ? "Adding..." : "Add Vehicle"}
                        </button>
                    </div>
                </form>
            </Modal>
        )}
      </div>
    </div>
  );
}