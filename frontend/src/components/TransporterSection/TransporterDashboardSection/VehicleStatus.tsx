"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdLocalShipping } from "react-icons/md";

interface Vehicle {
  id: number;
  vehicleNumber: string;
  vehicleType: string;
  model: string;
}
const VehicleStatus: React.FC = () => {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const transporterId = localStorage.getItem("transporterId");
    if (!transporterId) return;
    axios
      .get(`http://localhost:8080/api/vehicles/transporter/${transporterId}`)
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error("Error fetching vehicles:", err));
  }, []);

  return (
    <div className="col-span-3 p-5 rounded-xl bg-white dark:bg-card  shadow-lg mb-3 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
          Vehicle Status
        </h3>
        <button
          onClick={() => router.push("/transporter/fleet")}
          className="px-3 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition text-xs"
        >
          Show More
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {vehicles.slice(0, 4).map((v) => (
          <div
            key={v.id}
            className="col-span-1 flex items-center gap-4 p-3 rounded-lg bg-gray-100 dark:bg-background"
          >
            <div className="w-10 h-10 rounded-md bg-white dark:bg-gray-700 flex items-center justify-center">
              <MdLocalShipping
                size={22}
                className="text-gray-700  dark:text-gray-200"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-600 dark:text-gray-50">
                Vehicle number: {v.vehicleNumber}
              </p>
              <p className="text-xs text-gray-400">
                Vehicle type: {v.vehicleType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleStatus;
