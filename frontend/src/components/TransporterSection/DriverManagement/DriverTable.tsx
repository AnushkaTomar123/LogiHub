"use client";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface Driver {
  id: number;
  driverName: string;
  licenseNumber: string;
  phoneNumber: string;
  status: "AVAILABLE" | "ON_DUTY" | "OFF_DUTY";
}

interface DriverTableProps {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
  onDelete: (id: number) => void;
  onStatusChange: (driver: Driver, status: string) => void;
}

const DriverTable=({ drivers, onEdit, onDelete, onStatusChange }: DriverTableProps)=> {
  const getStatusColor = (status: Driver["status"]) => {
    switch (status) {
      case "AVAILABLE": return "text-green-500";
      case "ON_DUTY": return "text-yellow-500";
      case "OFF_DUTY": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-card shadow-lg rounded-xl p-5 border border-gray-200 dark:border-gray-700">
         <h2 className="text-lg px-4 font-semibold mb-4 text-black dark:text-gray-200">
        Driver Details
      </h2>
      {drivers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className=" bg-gray-50 dark:bg-card border-b border-gray-300 dark:border-gray-700 ">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">License</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="bg-gray-50 dark:bg-card border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-violet-600">
                  <td className="py-3 px-4">{d.driverName}</td>
                  <td className={`py-3 px-4 ${getStatusColor(d.status)}`}>
                    <select
                      value={d.status}
                      onChange={(e) => onStatusChange(d, e.target.value)}
                      className="bg-transparent border rounded-md px-2 py-1"
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="ON_DUTY">On Duty</option>
                      <option value="OFF_DUTY">Off Duty</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">{d.phoneNumber}</td>
                  <td className="py-3 px-4">{d.licenseNumber}</td>
                  <td className="py-3 px-4 text-center flex justify-center gap-3">
                    <button onClick={() => onEdit(d)} className="text-yellow-500 hover:text-yellow-600">
                      <MdEdit size={20} />
                    </button>
                    <button onClick={() => onDelete(d.id)} className="text-red-500 hover:text-red-700">
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-6 text-gray-500">No Drivers Found</p>
      )}
    </div>
  );
}
export default  DriverTable