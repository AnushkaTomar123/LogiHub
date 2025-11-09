"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransporterHeader from "@/components/TransporterSection/TransporterHeader";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import AddDriverModal from "./AddDriverModal";

interface Driver {
  id: number;
  driverName: string;
  licenseNumber: string;
  phoneNumber: string;
  status: "AVAILABLE" | "ON_DUTY" | "OFF_DUTY";
  transporterId?: number;
}

const Driver=()=> {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [transporterId, setTransporterId] = useState<number | null>(null);
   const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
      if (typeof window !== "undefined")
        return localStorage.getItem("sidebarCollapsed") === "true";
      return false;
    });
  const sidebarWidth = sidebarCollapsed ? 80 : 256;

    useEffect(() => {
    const handler = () => {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Fetch transporter ID
  useEffect(() => {
    const fetchTransporter = async () => {
      const email = localStorage.getItem("email");
      if (!email) return;
      const res = await axios.get(`http://localhost:8080/api/transporters/by-email?email=${email}`);
      setTransporterId(res.data.id);
    };
    fetchTransporter();
  }, []);

  const fetchDrivers = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/api/transporters/drivers/transporter/${id}`);
    setDrivers(res.data);
  };

  useEffect(() => {
    if (transporterId) fetchDrivers(transporterId);
  }, [transporterId]);

  const handleAddDriver = async (form: { driverName: string; licenseNumber: string; phoneNumber: string }) => {
    const id = transporterId || Number(localStorage.getItem("transporterId"));
    if (!id) return alert("Transporter ID missing");
    await axios.post("http://localhost:8080/api/transporters/drivers", { ...form, transporterId: id, status: "AVAILABLE" });
    setShowAddModal(false);
    fetchDrivers(id);
  };

  const handleDeleteDriver = async (id: number) => {
    if (!confirm("Delete this driver?")) return;
    await axios.delete(`http://localhost:8080/api/transporters/drivers/${id}`);
    fetchDrivers(transporterId!);
  };

  const handleStatusChange = async (driver: Driver, status: string) => {
    await axios.put(`http://localhost:8080/api/transporters/drivers/${driver.id}`, { ...driver, status });
    fetchDrivers(transporterId!);
  };

  const stats = {
    total: drivers.length,
    available: drivers.filter((d) => d.status === "AVAILABLE").length,
    onDuty: drivers.filter((d) => d.status === "ON_DUTY").length,
    offDuty: drivers.filter((d) => d.status === "OFF_DUTY").length,
  };


  return (
    <div  style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="min-h-screen bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100">
      <TransporterHeader />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Driver Management</h1>
          <button onClick={() => setShowAddModal(true)} className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700">
            + Add Driver
          </button>
        </div>

        <DriverStats {...stats} />
        <DriverTable drivers={drivers} onEdit={() => {}} onDelete={handleDeleteDriver} onStatusChange={handleStatusChange} />
      </div>

      {showAddModal && <AddDriverModal onClose={() => setShowAddModal(false)} onAdd={handleAddDriver} />}
    </div>
  );
}
export default Driver;