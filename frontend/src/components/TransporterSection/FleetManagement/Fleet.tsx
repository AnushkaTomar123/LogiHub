"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransporterHeader from "@/components/TransporterSection/TransporterHeader";
import FleetStats from "./FleetStats";
import VehiclesTable from "./VehiclesTable";
import VehicleModal from "./VehicleModal";

export default function FleetTracking() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [vehicleModels, setVehicleModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [transporterId, setTransporterId] = useState<number | null>(null);
  const [username, setUsername] = useState("Transporter");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [form, setForm] = useState({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    capacity: 0,
    status: "AVAILABLE",
  });

  
  // Fetch vehicle types & models
  useEffect(() => {
    (async () => {
      try {
        const [types, models] = await Promise.all([
          axios.get("http://localhost:8080/api/vehicles/api/vehicle/types"),
          axios.get("http://localhost:8080/api/vehicles/api/vehicle/models"),
        ]);
        setVehicleTypes(types.data);
        setVehicleModels(models.data);
      } catch {
        toast.error("Failed to load vehicle types/models");
      }
    })();
  }, []);

  // Fetch transporter & vehicles
  useEffect(() => {
    (async () => {
      const email = localStorage.getItem("email");
      if (!email) return toast.error("Session expired. Please log in again.");
      try {
        const res = await axios.get(
          `http://localhost:8080/api/transporters/by-email?email=${email}`
        );
        const id = res.data.id;
        setTransporterId(id);
        setUsername(res.data.contactPersonName || "Transporter");
        fetchVehicles(id);
      } catch {
        toast.error("Failed to fetch transporter data");
      }
    })();
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

  //  Save (Add/Edit)
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

  const handleEdit = (v: any) => {
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

  return (
    <div
     
      className="min-h-screen p-0 bg-gray-50 dark:bg-background transition-colors duration-300"
    >
      <TransporterHeader />
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Fleet Management</h1>
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
            className="bg-violet-600 px-4 py-2 rounded-lg hover:bg-violet-700 flex items-center gap-2 text-gray-100 dark:text-gray-200"
          >
            <MdAdd size={20} /> Add Vehicle
          </button>
        </div>

        {/* Stats */}
        <FleetStats vehicles={vehicles} />

        {/* Table */}
        <VehiclesTable
          vehicles={vehicles}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        {isModalOpen && (
          <VehicleModal
            form={form}
            vehicleTypes={vehicleTypes}
            vehicleModels={vehicleModels}
            editingVehicle={editingVehicle}
            onChange={setForm}
            onSubmit={handleSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      </div>
    </div>
  );
}
