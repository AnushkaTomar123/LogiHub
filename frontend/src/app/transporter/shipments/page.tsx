"use client";

import React, { useState } from "react";
import TransporterHeader from "../../../components/TransporterSection/TransporterHeader";
import { useTheme } from "next-themes";
import ShipmentTabs from "../../../components/TransporterSection/TransportShipment/ShipmentTabs";
import ProgressCard from "../../../components/TransporterSection/TransportShipment/ProgressCard";
import SearchBar from "../../../components/TransporterSection/TransportShipment/SearchBar";
import AddShipmentButton from "../../../components/TransporterSection/TransportShipment/AddShipmentButton";
import MonthlyStatsCard from "../../../components/TransporterSection/TransportShipment/MonthlyStatsCard";
import ShipmentTable from "../../../components/TransporterSection/TransportShipment/ShipmentTable";

const MOCK_SHIPMENTS = [
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
];

const MOCK_SUMMARY = {
  totalShipments: 400,
  totalOrders: 400,
  totalEarning: 400,
  totalProfit: 400,
  totalExpenditure: 400,
};

export default function ShipmentTracking() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-white dark:bg-background text-gray-100 transition-colors duration-300`}>
      <TransporterHeader />

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left */}
        <div className="md:col-span-1 space-y-6">
          <ShipmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="space-y-4 pr-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <ProgressCard status="Running" isRunning={true} />
            <ProgressCard status="Delivered" isRunning={false} />
            <ProgressCard status="Delivered" isRunning={false} />
          </div>
        </div>

        {/* Middle */}
        <div className="md:col-span-2 space-y-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="bg-gray-100 dark:bg-card rounded-xl overflow-hidden shadow-lg h-[400px] flex items-center justify-center border border-gray-200 dark:border-zinc-600">
            <div className="text-gray-500 text-lg">Map Placeholder</div>
          </div>
        </div>

        {/* Right */}
        <div className="md:col-span-1 space-y-6">
          <AddShipmentButton />
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-card shadow-lg border border-gray-200 dark:border-zinc-600 space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white border-b border-gray-200 dark:border-zinc-600 pb-2">This Month</h3>
            {Object.entries(MOCK_SUMMARY).map(([key, value]) => (
              <MonthlyStatsCard key={key} title={key.replace(/([A-Z])/g, " $1")} value={value} />
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="md:col-span-4">
          <ShipmentTable shipments={MOCK_SHIPMENTS} />
        </div>
      </div>
    </div>
  );
}
