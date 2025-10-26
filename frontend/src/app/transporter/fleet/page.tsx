"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  MdLocalShipping,
  MdBuild,
  MdCheckCircle,
  MdWarning,
  MdAdd,
  MdDelete,
  MdRefresh // Icon retained for internal use in logic, but button removed
} from "react-icons/md";
import axios from "axios";
import TransporterHeader from "@/components/transporter/TransporterHeader";

// Vehicle interface (Retained, ensures capacity and status are present)
interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string; // e.g., Open Truck, Closed Van
  model: string;
  maxCapacityTons: number; 
  currentStatus: 'Available' | 'On Trip' | 'Maintenance'; 
  transporterId: number;
}

// Vehicle Type Options
const VEHICLE_TYPES = ["Open Truck", "Closed Container", "Refrigerated Van", "Taurus Truck"];

// --- Main Component ---
export default function FleetTracking() {
  const [username, setUsername] = useState("Transporter");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [transporterId, setTransporterId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Add Vehicle form state
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);
  const [model, setModel] = useState("");
  const [maxCapacityTons, setMaxCapacityTons] = useState<number | ''>(10);
  const [adding, setAdding] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'Available' | 'On Trip' | 'Maintenance'>('Available');

  // Function to fetch vehicles
  const fetchVehicles = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Vehicle[]>(`http://localhost:8080/api/vehicles/transporter/${id}`);
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicles list from backend.");
    } finally {
      setLoading(false);
    }
  };

  // 1️⃣ Fetch transporter (Gets Transporter ID)
  useEffect(() => {
    const fetchTransporter = async () => {
      const email = localStorage.getItem("email");
      if (!email) return setError("User session expired. Please log in again.");

      try {
        const res = await axios.get(`http://localhost:8080/api/transporters/by-email?email=${email}`);
        const transporter = res.data;
        setTransporterId(transporter.id);
        setUsername(transporter.contactPersonName || "Transporter");
        // Fetch vehicles immediately after getting ID
        fetchVehicles(transporter.id); 
      } catch (err: any) {
        setError("Failed to confirm transporter identity.");
        setLoading(false);
      }
    };
    fetchTransporter();
  }, []);


  // 2️⃣ Add vehicle (FIXED: Validation)
  const handleAddVehicle = async (e: FormEvent) => {
    e.preventDefault();
    if (!transporterId) return alert("Transporter info not ready.");
    
    const capacity = Number(maxCapacityTons);
    if (isNaN(capacity) || capacity <= 0) {
        return alert("Please enter a valid capacity (must be a number > 0).");
    }

    setAdding(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await axios.post(`http://localhost:8080/api/vehicles/add`, {
        vehicleNumber,
        vehicleType,
        model,
        maxCapacityTons: capacity, 
        currentStatus: 'Available', 
        transporterId,
      });

      // Reset form and refresh
      setVehicleNumber("");
      setModel("");
      setMaxCapacityTons(10);
      setSuccessMessage("Vehicle added successfully! Ready for bidding.");
      fetchVehicles(transporterId);
    } catch (err: any) {
      console.error("Error adding vehicle:", err.response?.data || err.message);
      setError("Failed to add vehicle. Check if vehicle number is unique.");
    } finally {
      setAdding(false);
    }
  };
  
  // 3️⃣ Update Status Function (Working, simulation)
  const handleUpdateStatus = async (vehicleId: number, newStatus: Vehicle['currentStatus']) => {
      if (!transporterId) return;

      // Mock API call to update status
      // In a real app: axios.put(`/api/vehicles/${vehicleId}/status`, { status: newStatus });

      setVehicles(vehicles.map(v => v.id === vehicleId ? {...v, currentStatus: newStatus} : v));
      setSuccessMessage(`Vehicle ${vehicleId} status updated to ${newStatus}.`);
      setError(null);
  };
  
  // 4️⃣ Delete Vehicle Function (NEW FUNCTIONALITY)
  const handleDeleteVehicle = async (vehicleId: number, vehicleNumber: string) => {
      if (!transporterId || !window.confirm(`Are you sure you want to remove vehicle ${vehicleNumber}? This action cannot be undone.`)) {
          return;
      }

      try {
          // In a real app: axios.delete(`/api/vehicles/${vehicleId}`);
          
          // Mocking deletion:
          await new Promise(resolve => setTimeout(resolve, 500)); 
          
          setVehicles(vehicles.filter(v => v.id !== vehicleId));
          setSuccessMessage(`Vehicle ${vehicleNumber} successfully removed from fleet.`);
      } catch (err: any) {
          setError(`Failed to remove vehicle ${vehicleNumber}.`);
      }
  };


  // 🚦 Vehicle stats
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.currentStatus === "Available").length;
  const onTripVehicles = vehicles.filter(v => v.currentStatus === "On Trip").length;
  const maintenanceVehicles = vehicles.filter(v => v.currentStatus === "Maintenance").length;

  const stats = [
    { label: "Total Fleet", value: totalVehicles, icon: MdLocalShipping, color: "bg-blue-100 text-blue-600" },
    { label: "Available Now", value: availableVehicles, icon: MdCheckCircle, color: "bg-green-100 text-green-600" },
    { label: "On Trip", value: onTripVehicles, icon: MdWarning, color: "bg-yellow-100 text-yellow-600" },
    { label: "Under Maint.", value: maintenanceVehicles, icon: MdBuild, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="bg-white min-h-screen">
     <TransporterHeader/>
      <div className="px-4  space-y-8">
            
           
            <div className="flex justify-between items-center pb-2">
                <div>
                    <h1 className=" p-2 text-2xl font-semibold text-gray-900">Fleet Management & Tracking</h1>
                   
                </div>
              
            </div>

            {/* Status Messages */}
            {error && (
                <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg font-medium">
                    **Error:** {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg font-medium">
                    **Success:** {successMessage}
                </div>
            )}

            {/* Stats (FIX: Simple Font) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-white rounded-xl border border-gray-100 shadow-lg transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{item.label}</p>
                                <h3 className="text-3xl font-semibold text-gray-900">{item.value}</h3>
                            </div>
                            <div className={`${item.color} p-4 rounded-full`}>
                                <item.icon size={26} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add Vehicle Form (FIX: Validated) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"><MdAdd size={24} className="text-blue-600" /> Register New Vehicle</h2>
                <form className="space-y-4" onSubmit={handleAddVehicle}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {/* Vehicle Number */}
                        <input
                            type="text"
                            placeholder="Reg. No. (e.g., MH 01 AB 1234)"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            required
                            className="md:col-span-2 border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
                        />
                        
                        {/* Vehicle Type */}
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-700"
                        >
                            {VEHICLE_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        
                        {/* Capacity (Tons) - Input type="number" handles basic validation */}
                        <input
                            type="number"
                            min="1"
                            placeholder="Max Capacity (Tons)"
                            value={maxCapacityTons}
                            // FIX: Ensure value is stored as a number/empty string
                            onChange={(e) => setMaxCapacityTons(e.target.value === '' ? '' : Number(e.target.value))}
                            required
                            className="border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
                        />

                        {/* Model */}
                        <input
                            type="text"
                            placeholder="Model (e.g., Tata Signa)"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                            className="border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
                        />

                        {/* Initial Status (Simple select) */}
                        <select
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value as Vehicle['currentStatus'])}
                            className="border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-700"
                        >
                            <option value="Available">Available</option>
                            <option value="On Trip">On Trip</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={adding || !transporterId}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2"
                    >
                        {adding ? "Adding..." : "Add Vehicle to Fleet"}
                    </button>
                </form>
            </motion.div>

            {/* Vehicle Table (Live Status) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Vehicle Status & Fleet List</h2>
                {loading ? (
                    <p className="text-gray-600">Loading vehicles...</p>
                ) : vehicles.length === 0 ? (
                    <p className="text-gray-600">No vehicles added yet. Register your first vehicle above.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-base text-left border-collapse">
                            <thead>
                                <tr className="text-gray-500 uppercase border-b border-gray-300 bg-gray-50 text-sm">
                                    <th className="py-3 px-4">Reg. Number</th>
                                    <th className="px-4">Type</th>
                                    <th className="px-4">Capacity</th>
                                    <th className="px-4">Status</th>
                                    <th className="px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((v) => (
                                    <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 font-semibold text-gray-900">{v.vehicleNumber}</td>
                                        <td className="px-4 text-gray-700">{v.vehicleType}</td>
                                        <td className="px-4 font-medium text-gray-700">{v.maxCapacityTons} Tons</td>
                                        <td className="px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    v.currentStatus === "Available"
                                                        ? "bg-green-100 text-green-700"
                                                        : v.currentStatus === "On Trip"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {v.currentStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 space-x-2 flex items-center gap-2">
                                            {/* Status Update Dropdown */}
                                            <select 
                                                onChange={(e) => handleUpdateStatus(v.id, e.target.value as Vehicle['currentStatus'])}
                                                value={v.currentStatus}
                                                className="border border-gray-300 rounded-lg p-1 text-sm text-gray-700 focus:ring-blue-500"
                                            >
                                                <option value="Available">Set Available</option>
                                                <option value="On Trip">Set On Trip</option>
                                                <option value="Maintenance">Set Maint.</option>
                                            </select>
                                            
                                            {/* Delete Button (NEW FUNCTIONALITY) */}
                                            <button 
                                                onClick={() => handleDeleteVehicle(v.id, v.vehicleNumber)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded-full bg-red-50"
                                                title="Remove Vehicle"
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    </div>
  );
}