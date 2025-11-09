"use client";
import React from "react";
import {
  MdLocalShipping,
  MdCheckCircle,
  MdDirectionsRun,
  MdBlock,
} from "react-icons/md";

interface Vehicle {
  status: string;
}

export default function FleetStats({ vehicles }: { vehicles: Vehicle[] }) {
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === "AVAILABLE").length;
  const onRoute = vehicles.filter((v) => v.status === "ON_ROUTE").length;
  const unavailable = vehicles.filter((v) => v.status === "UNAVAILABLE").length;

  const cards = [
    {
      label: "Total Vehicles",
      value: total,
      icon: MdLocalShipping,
      color: "bg-violet-300 text-violet-600",
    },
    {
      label: "Available",
      value: available,
      icon: MdCheckCircle,
      color: "bg-violet-300 text-violet-600 ",
    },
    {
      label: "On Route",
      value: onRoute,
      icon: MdDirectionsRun,
      color: "bg-violet-300 text-violet-600 ",
    },
    {
      label: "Unavailable",
      value: unavailable,
      icon: MdBlock,
      color: "bg-violet-300  text-violet-600 ",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white dark:bg-card p-5 rounded-xl shadow border border-gray-200 dark:border-gray-700"
        >
          <div>
            <h2 className="text-gray-600 dark:text-gray-300 text-sm">
              {card.label}
            </h2>
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
