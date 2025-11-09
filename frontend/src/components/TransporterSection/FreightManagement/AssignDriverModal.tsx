"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

export default function AssignDriverModal({ onClose }: Props) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);

  const [selectedBooking, setSelectedBooking] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch confirmed bookings, drivers and vehicles
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/bookings/status/ACCEPTED");
        setBookings(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    };
 const transporterId =localStorage.getItem("transporterId")
    const fetchDrivers = async (id: number) => {
    const res = await axios.get(`http://localhost:8080/api/transporters/drivers/transporter/${transporterId}`);
    setDrivers(res.data);
  };

    
   const fetchVehicles = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/vehicles/transporter/${transporterId}`
      );
      setVehicles(res.data);
    } catch {
      toast.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };
    fetchBookings();
    fetchDrivers();
    fetchVehicles();
  }, []);

  const handleAssignDriver = async () => {
    if (!selectedBooking || !selectedDriver || !selectedVehicle)
      return alert("All fields are required");
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/bookings/assign-driver", {
        bookingId: Number(selectedBooking),
        driverId: Number(selectedDriver),
        vehicleId: Number(selectedVehicle),
      });
      alert("Driver assigned successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to assign driver");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 p-6 pt-20">
      <div className="bg-white dark:bg-background p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-violet-600">Assign Driver</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          {/* Booking Dropdown with details */}
          <select
            value={selectedBooking}
            onChange={(e) => setSelectedBooking(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Confirmed Booking</option>
            {bookings.map((b) => (
              <option key={b.id} value={b.id}>
                ID: {b.id} | {b.pickupAddress} → {b.dropAddress} | Pickup:{" "}
                {new Date(b.pickupDate).toLocaleDateString()}
              </option>
            ))}
          </select>

          {/* Driver Dropdown with names */}
          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.phone || d.id})
              </option>
            ))}
          </select>

          {/* Vehicle Dropdown with numbers */}
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.vehicleNumber} ({v.vehicalType})
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignDriver}
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}
