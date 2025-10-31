"use client";

import React, { useEffect, useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdLocalShipping,
  MdRoute,
  MdPerson,
  MdCalendarToday,
  MdAttachMoney,
  MdTrendingUp,
  MdTrendingDown,
  MdMoneyOff,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import { useTheme } from "next-themes";
import axios from "axios"; // Assuming axios is used for API calls

// --- Interface and Mock Data ---

interface Shipment {
  trackingId: string;
  commodity: string;
  deliverySource: string;
  deliveryDestination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: string;
  payment: number;
  status: "Delivered" | "Running" | "Stopped";
}

interface ShipmentSummary {
  totalShipments: number;
  totalOrders: number;
  totalEarning: number;
  totalProfit: number;
  totalExpenditure: number;
}

// Mock Data to match the screenshot details
const MOCK_SHIPMENTS: Shipment[] = [
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
  { trackingId: "3039887iu", commodity: "kachchha mal", deliverySource: "Indore,M.P", deliveryDestination: "Kanpur,UP", pickupDate: "10/04/2024", deliveryDate: "15/04/2024", weight: "10 ton", payment: 50000, status: "Delivered" },
];

const MOCK_SUMMARY: ShipmentSummary = {
  totalShipments: 400,
  totalOrders: 400,
  totalEarning: 400,
  totalProfit: 400,
  totalExpenditure: 400,
};

// --- Helper Components ---

// Dark Themed Stats Card (Reused from previous components)
const StatCard = ({ title, value, icon }: { title: string; value: number | string; icon: React.ElementType }) => (
    <div className="p-4 rounded-xl shadow-md bg-[#1e293b] text-white flex flex-col justify-between h-20">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-xl font-bold">{value}</p>
    </div>
);

// Progress Card (Matching the left side of the screenshot)
const ProgressCard = ({ status, isRunning }: { status: string, isRunning: boolean }) => (
    <div className={`p-4 rounded-xl border-l-4 ${isRunning ? 'border-violet-600 bg-[#1e293b]' : 'border-green-600 bg-[#1e293b]'} shadow-lg text-white mb-4`}>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">MP08HAI1122</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isRunning ? 'bg-orange-600' : 'bg-green-600'}`}>
                {isRunning ? 'On Progress' : 'Delivered'}
            </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
            <div className="flex flex-col">
                <p className="font-semibold">Indore</p>
                <span className="text-xs text-gray-400">10/11/22</span>
            </div>
            <div className="flex flex-col items-center text-gray-400 text-xs">
                <MdRoute size={20} />
                <span className="text-xs">Dist: 800km</span>
            </div>
            <div className="flex flex-col text-right">
                <p className="font-semibold">Mumbai</p>
                <span className="text-xs text-gray-400">14/11/22</span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
            <MdPerson size={16} /> Riya Tomar
            <MdLocalShipping size={16} className="ml-auto" />
        </div>
    </div>
);


// Monthly Stats Card (Matching the right side of the screenshot)
const MonthlyStatsCard = ({ title, value }: { title: string, value: number }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#3C3D3F] shadow-md">
        <span className="text-sm text-gray-400">{title}</span>
        <span className="text-lg font-bold text-violet-400">{value}</span>
    </div>
);


// --- Main Component ---
export default function ShipmentTracking() {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS); // Using mock data
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  // ✅ SIDEBAR ADJUSTMENT LOGIC
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  // --- End Sidebar Logic ---

  // --- API Placeholder ---
  // A function to fetch shipments would go here
  // const fetchShipments = async (status: string) => { /* ... API call ... */ };
  
  const filteredShipments = shipments.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
        s.trackingId.toLowerCase().includes(term) ||
        s.deliverySource.toLowerCase().includes(term) ||
        s.deliveryDestination.toLowerCase().includes(term);
        
    const matchesTab = activeTab === "All" || 
                       (activeTab === "Stopped" && s.status === "Stopped") ||
                       (activeTab === "Running" && s.status === "Running");

    return matchesSearch && matchesTab;
  });

  // --- Main Render ---
  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  return (
    <div
        style={{
            marginLeft: sidebarWidth,
            transition: "margin-left 300ms ease",
        }}
        className={`min-h-screen bg-[#1A1F26] text-gray-100 transition-colors duration-300`}
    >
      <TransporterHeader />

      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* --- Left Column: Shipments Progress & Tabs --- */}
        <div className="md:col-span-1 space-y-6">
            
            {/* Tabs for Shipment Status */}
            <div className="flex justify-between bg-[#3C3D3F] p-1 rounded-xl shadow-lg">
                {["All(1)", "Stopped(5)", "Running(6)"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.split('(')[0])}
                        className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${
                            activeTab === tab.split('(')[0]
                                ? 'bg-violet-600 text-white shadow-md'
                                : 'text-gray-400 hover:bg-[#1A1F26]'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Shipment Progress Cards (Scrollable) */}
            <div className="space-y-4 pr-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {/* Mock progress cards based on screenshot */}
                <ProgressCard status="Running" isRunning={true} />
                <ProgressCard status="Delivered" isRunning={false} />
                <ProgressCard status="Delivered" isRunning={false} />
                {/* Add more mock cards to test scrolling if needed */}
                <ProgressCard status="Running" isRunning={true} />
                <ProgressCard status="Delivered" isRunning={false} />
            </div>
        </div>
        
        {/* --- Middle Column: Search, Map & Summary Stats --- */}
        <div className="md:col-span-2 space-y-6">
            {/* Search Route */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search Route..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-700 rounded-xl bg-[#1e293b] text-white focus:ring-violet-500 focus:border-violet-500"
                />
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>

            {/* Shipment Map (Placeholder) */}
            <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg h-[400px] flex items-center justify-center border border-gray-700">
                <div className="text-gray-500 text-lg">
                                    </div>
            </div>
            
            {/* Detailed Tracking Table Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Search Order...</h2>
                <div className="bg-violet-600 p-2 rounded-xl text-white hover:bg-violet-700 cursor-pointer">
                    <MdSearch size={20} />
                </div>
            </div>
        </div>

        {/* --- Right Column: Add Shipment & Financial Summary --- */}
        <div className="md:col-span-1 space-y-6">
            
            {/* Add Shipment Button */}
            <button
                onClick={() => alert("Open Add Shipment Modal")}
                className="w-full bg-violet-600 text-white px-5 py-3 rounded-xl hover:bg-violet-700 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
            >
                <MdAdd size={24} /> Add Shipment
            </button>

            {/* Monthly Financial Summary */}
            <div className="p-4 rounded-xl bg-[#1e293b] shadow-lg border border-gray-700 space-y-3">
                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">This Month</h3>
                <MonthlyStatsCard title="Total Shipments" value={MOCK_SUMMARY.totalShipments} />
                <MonthlyStatsCard title="Total Orders" value={MOCK_SUMMARY.totalOrders} />
                <MonthlyStatsCard title="Total Earning" value={MOCK_SUMMARY.totalEarning} />
                <MonthlyStatsCard title="Total Profit" value={MOCK_SUMMARY.totalProfit} />
                <MonthlyStatsCard title="Total Expenditure" value={MOCK_SUMMARY.totalExpenditure} />
            </div>
        </div>
        
        {/* --- Full Width: Tracking Details Table --- */}
        <div className="md:col-span-4 bg-[#1e293b] rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Tracking Order</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 uppercase border-b border-gray-700 text-xs">
                            <th className="py-3 px-2">Track ID</th>
                            <th className="px-2">Commodity</th>
                            <th className="px-2">Delivery Source</th>
                            <th className="px-2">Delivery Destination</th>
                            <th className="px-2">Pickup Date</th>
                            <th className="px-2">Delivery Date</th>
                            <th className="px-2">Weight</th>
                            <th className="px-2">Payment</th>
                            <th className="px-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_SHIPMENTS.map((shipment, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-[#1a2538] transition-colors text-gray-300">
                                <td className="py-3 px-2 font-semibold text-white">{shipment.trackingId}</td>
                                <td className="px-2">{shipment.commodity}</td>
                                <td className="px-2">{shipment.deliverySource}</td>
                                <td className="px-2">{shipment.deliveryDestination}</td>
                                <td className="px-2">{shipment.pickupDate}</td>
                                <td className="px-2">{shipment.deliveryDate}</td>
                                <td className="px-2">{shipment.weight}</td>
                                <td className="px-2">{shipment.payment}</td>
                                <td className="px-2">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${shipment.status === 'Delivered' ? 'bg-green-600' : 'bg-red-600'}`}>
                                        {shipment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}