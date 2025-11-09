"use client";
import { useEffect, useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";


interface Driver {
  licenseNumber: string;
  id: number;
  driverName: string;
  status?: string;
}

const DriverStatus = () => {
     const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [transporterId, setTransporterId] = useState<number | null>(null);
  useEffect(() => {
    const transporterId=localStorage.getItem("transporterId")
    if (!transporterId) return;
    axios
      .get(
        `http://localhost:8080/api/transporters/drivers/transporter/${transporterId}`
      )
      .then((res) => setDrivers(res.data.map((d: Driver) => ({ ...d }))))
      .catch((err) => console.error("Error fetching drivers:", err));
  }, [transporterId]);

  return (
    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-xl bg-white dark:bg-card  shadow-lg mb-2">
      <div className="md:col-span-2 flex items-center justify-between mb-1">
        <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
          Driver Status
        </h3>
        <button
          onClick={() => router.push("/transporter/drivers")}
          className="text-xs px-2 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition"
        >
          Show More
        </button>
      </div>

      {drivers.slice(0, 4).map((driver, index) => (
        <div
          key={index}
          className="col-span-1 flex items-center gap-2 p-2 rounded-lg  bg-gray-100 dark:bg-background transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-violet-300  flex items-center justify-center font-semibold text-sm text-gray-600 dark:text-violet-600">
            {driver.driverName.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-xs text-gray-600 dark:text-gray-400">
              {driver.driverName}
            </p>
            <p className="text-[10px] text-gray-600 dark:text-gray-400">
              <span>License No.:{driver.licenseNumber}</span>
            </p>
          </div>
         
        </div>
      ))}
    </div>
  );
};

export default DriverStatus;
