"use client";
import React from "react";
import { MdPeople, MdDirectionsCar, MdWork, MdStar } from "react-icons/md";

interface DriverStatsProps {
  total: number;
  available: number;
  onDuty: number;
  offDuty: number;
}

const DriverStats=({ total, available, onDuty, offDuty }: DriverStatsProps)=> {
  const cards = [
    { label: "Total Drivers", value: total, icon: MdPeople, color: "bg-violet-300 text-violet-600" },
    { label: "Available", value: available, icon: MdStar, color: "bg-violet-300 text-violet-600" },
    { label: "On Duty", value: onDuty, icon: MdWork, color: "bg-violet-300 text-violet-600" },
    { label: "Off Duty", value: offDuty, icon: MdDirectionsCar, color: "bg-violet-300 text-violet-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white dark:bg-card p-5 rounded-xl shadow border border-gray-200 dark:border-gray-700"
        >
          <div>
            <h2 className="text-gray-600 dark:text-gray-300 text-sm">{card.label}</h2>
            <p className="text-xl font-bold mt-1">{card.value}</p>
          </div>
          <div className={`p-3 rounded-full ${card.color}`}>
            <card.icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default  DriverStats