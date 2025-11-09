"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useRouter } from "next/navigation";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const Chart: React.FC = () => {
  const router = useRouter();

  // ✅ Chart Data
  const data: ChartData[] = [
    { name: "Truck", value: 40, color: "#8B5CF6" }, 
    { name: "Trailer", value: 25, color: "#3B82F6" }, 
    { name: "Tempo", value: 15, color: "#F97316" }, 
    { name: "Cargo Van", value: 10, color: "#10B981" }, 
    { name: "Mini Truck", value: 10, color: "#EF4444" }, 
  ];

  return (
    <div className="col-span-1  bg-white dark:bg-card rounded-xl p-2  text-gray-700 dark:text-white shadow-lg flex flex-col items-center">
      <h3 className="font-semibold mb-1 text-center">Vehicle Utilization Report</h3>

      {/*  Pie Chart Section */}
      <div className="w-full h-44 flex items-center justify-center">
        <div className="w-40 h-40 bg-gray-100 dark:bg-card rounded-full flex items-center justify-center">
          <PieChart width={280} height={250}>
            <Pie
              data={data }
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/*  Legend / Bars */}
      <div className="w-full mt-4 px-2 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="w-full">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-300">{item.name}</span>
              <span className="text-gray-500 dark:text-gray-400">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => router.push("/transporter/shipment")}
        className="w-full mt-2 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition"
      >
        Tracking Shipment
      </button>
    </div>
  );
};

export default Chart;
