"use client";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { MdLocalShipping } from "react-icons/md";

export default function VehiclesTable({
  vehicles,
  loading,
  onEdit,
  onDelete,
}: any) {
  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading vehicles...
      </p>
    );

  if (vehicles.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No vehicles added yet.
      </p>
    );

  return (
    <div className="bg-gray-50 dark:bg-card text-white rounded-xl p-5 shadow-lg border border-gray-200  dark:border-zinc-600 overflow-hidden">
      <h2 className="text-lg px-5 font-semibold mb-4 text-black dark:text-gray-200">
        Vehicle Details
      </h2>

      <div className="overflow-x-auto  ">
        <table className="min-w-full text-sm ">
          <thead>
            <tr className="bg-white dark:bg-card text-gray-700 dark:text-gray-200 uppercase text-sm p-4 border-b border-gray-200 dark:border-zinc-500">
              <th className="px-5 py-3 text-left ">Vehicle</th>
              <th className="px-5 py-3 text-left ">Vehicle Number</th>
              <th className="px-5 py-3 text-left ">Vehicle Type</th>
              <th className="px-5 py-3 text-left ">Vehicle Model</th>
              <th className="px-5 py-3 text-left ">Capacity</th>
              <th className="px-5 py-3 text-left ">Status</th>
              <th className="px-5 py-3 text-center">Set Availability</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v: any, i: number) => (
              <tr
                key={v.id}
                className="bg-gray-50 dark:bg-card p-2  hover:bg-violet-300 dark:hover:bg-violet-600 border-b border-gray-200 dark:border-zinc-500"
              >
                {/* Vehicle Image */}
                <td className="px-5 py-2">
                  <div className="flex items-center gap-3">
                   < MdLocalShipping size={30} className="text-violet-400 dark:text-violet-300 dark:hover:text-violet-50"/>
                  </div>
                </td>

                <td className="px-5 text-sm py-2 text-gray-700 dark:text-gray-300">{v.vehicleNumber}</td>
                <td className="px-5 text-sm py-2 text-gray-700 dark:text-gray-300">{v.vehicleType}</td>
                <td className="px-5 text-sm py-2 text-gray-700 dark:text-gray-300">{v.model}</td>
               
                <td className="px-5 text-sm py-2 text-gray-700 dark:text-gray-300">{v.capacity} Tons</td>
                <td className="px-5 text-sm py-2 text-gray-700 dark:text-gray-300">
                  <StatusBadge status={v.status} />
                </td>
                <td className="px-5 py-2 text-center">
                  <button
                    onClick={() => onEdit(v)}
                    className="bg-violet-100 text-violet-700 dark:bg-violet-300 dark:text-violet-600 dark:hover:bg-violet-50 dark:hover:text-violet-600 px-3 py-2 rounded-xl mr-1"
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(v.id)} className="bg-red-700 text-white px-3 py-2 ml-1 rounded-xl hover:bg-red-800 transition" > Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
