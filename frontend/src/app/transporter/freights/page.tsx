"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaTruckLoading,
  FaWeightHanging,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaAngleRight,
  FaEye,
  FaBox,
  FaRoad,
  FaShippingFast,
  FaCheckCircle,
  FaTimes,
  FaRupeeSign,
  FaSpinner,
  FaPhoneAlt,
  FaTag, 
} from "react-icons/fa";
import axios from "axios";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import { useTheme } from "next-themes"; 

// --- Interface ---
interface Load {
  id: number;
  pickupLocation: string;
  dropoffLocation: string;
  commodity: string;
  weightTons: number;
  vehicleTypeRequired: string;
  requiredCapacityTons: number;
  expectedPickupDate: string;
  expectedPickupTime: string;
  expectedDeliveryDate: string;
  freightPrice: number;
  loadId: string;
  vehicleType: string; 
  rate: number;
}

// --- Mock Data for Sidebar Sections (For UI consistency) ---
const MOCK_SIDEBAR_DATA = [
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
  { location: "Gwalior,M.P to Mumbai, MH", commodity: "Commodity: Household Items" },
];

// --- Modal Component (Kept for completeness) ---
const LoadDetailsModal: React.FC<{ load: Load; onClose: () => void }> = ({
  load,
  onClose,
}) => {
  const handleAccept = async () => {
    try {
      const transporterId = localStorage.getItem("transporterId");
      const vehicleId = 1;
      const driverId = 1;

      await axios.put(
        `http://localhost:8080/api/bookings/accept/${load.id}`,
        null,
        {
          params: { transporterId, vehicleId, driverId },
        }
      );

      alert(`Booking ${load.id} accepted successfully!`);
      onClose();
    } catch (error) {
      console.error("Error accepting booking:", error);
      alert("Failed to accept booking.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-[#1A1F26] rounded-xl shadow-2xl w-full max-w-2xl transform transition-all text-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-[#3C3D3F] rounded-t-xl">
          <h2 className="text-2xl font-bold text-violet-400">
            Load Details & Quote (ID: {load.loadId})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 p-2"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex justify-between items-center p-4 bg-[#3C3D3F] rounded-lg">
            <div>
              <p className="text-base font-semibold text-gray-400">Route:</p>
              <p className="text-xl font-extrabold text-white">
                {load.pickupLocation} <FaAngleRight className="inline mx-1 text-violet-400" />{" "}
                {load.dropoffLocation}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-400">Freight Offer:</p>
              <p className="text-2xl font-bold text-green-400 flex items-center justify-end">
                <FaRupeeSign className="w-4 h-4" />
                {load.freightPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              { label: "Commodity", value: load.commodity, icon: FaBox },
              { label: "Weight / Capacity", value: `${load.weightTons} T / ${load.requiredCapacityTons} T`, icon: FaWeightHanging },
              { label: "Pickup By", value: `${load.expectedPickupDate} (${load.expectedPickupTime})`, icon: FaCalendarAlt },
              { label: "Delivery By", value: load.expectedDeliveryDate, icon: FaShippingFast },
            ].map((item, index) => (
                <div key={index} className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F]">
                  <p className="font-semibold text-gray-400 flex items-center gap-1">
                    <item.icon className="text-violet-400" /> {item.label}:
                  </p>
                  <p className="font-bold text-white">{item.value}</p>
                </div>
              ))}
            <div className="p-3 border border-gray-700 rounded-lg bg-[#3C3D3F] col-span-2">
              <p className="font-semibold text-gray-400 flex items-center gap-1">
                <FaPhoneAlt className="text-violet-400" /> Shipper Contact:
              </p>
              <p className="font-bold text-white">
                Contact via Platform after Acceptance
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#3C3D3F] rounded-b-xl flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-600 rounded-lg font-semibold text-gray-300 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-3 bg-violet-600 text-white rounded-lg font-bold hover:bg-violet-700 transition flex items-center gap-2"
          >
            <FaCheckCircle /> Place Bid / Accept Load
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Load Card (UPDATED) ---
const LoadCard: React.FC<{ load: Load; onDetailsClick: (load: Load) => void }> =
  ({ load, onDetailsClick }) => {
    
    const handleAction = (action: 'Accept' | 'View' | 'Bid') => {
        if (action === 'View') {
            onDetailsClick(load);
        } else if (action === 'Accept') {
            alert(`Accepting Load ID: ${load.loadId}. Opening final confirmation modal...`);
        } else if (action === 'Bid') {
            alert(`Placing Bid for Load ID: ${load.loadId}. Opening bid modal...`);
        }
    };
    
    return (
        <div className="bg-[#1A1F26] rounded-xl p-5 border border-gray-700 shadow-xl text-gray-100">
            {/* Top Row: Load ID & Route */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-700">
                <p className="text-sm font-semibold text-gray-400 flex items-center gap-1">
                    <FaTag className="text-violet-400 w-3 h-3" /> Load ID:{load.loadId}
                </p>
                <p className="text-lg font-bold text-white flex items-center">
                    {load.pickupLocation.split(",")[0]}
                    <FaAngleRight className="text-sm mx-1 text-violet-400" />
                    {load.dropoffLocation.split(",")[0]}
                </p>
            </div>

            {/* Details Grid (Compact, Dark Theme) */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                {[
                    { label: "Commodity Type", value: load.commodity, icon: FaBox },
                    { label: "Vehicle Type", value: load.vehicleType, icon: FaTruckLoading },
                    { label: "Weight/Capacity", value: `${load.weightTons} ton`, icon: FaWeightHanging },
                    { label: "Pickup Date", value: load.expectedPickupDate, icon: FaCalendarAlt },
                    { label: "Expect Deliveriy", value: load.expectedDeliveryDate, icon: FaShippingFast },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <p className="font-medium text-gray-500">{item.label} :</p>
                        <p className="text-white font-semibold">{item.value}</p>
                    </div>
                ))}
                
                {/* Rate Row (Stretched) */}
                <div className="flex flex-col col-span-2">
                    <p className="font-medium text-gray-500">Rate :</p>
                    <p className="text-green-400 font-bold text-xl flex items-center">
                        <FaRupeeSign className="w-3 h-3 mr-1" />
                        {load.rate.toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-between gap-2 mt-4 pt-4 border-t border-gray-700">
                <button
                    onClick={() => handleAction('Accept')}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                >
                    Accept Load
                </button>
                <button
                    onClick={() => handleAction('View')}
                    className="flex-1 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition text-sm"
                >
                    View Details
                </button>
                <button
                    onClick={() => handleAction('Bid')}
                    className="flex-1 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition text-sm"
                >
                    Place Bid
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---
export default function LoadBoardPage() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New States for City Filters
  const [selectedLoadingCity, setSelectedLoadingCity] = useState("All");
  const [selectedUnloadingCity, setSelectedUnloadingCity] = useState("All");

  const [filterType, setFilterType] = useState("All"); // Vehicle Type
  const [selectedCommodity, setSelectedCommodity] = useState("All"); // Commodity Filter
  
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const { theme } = useTheme();

  // SIDEBAR ADJUSTMENT LOGIC
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


  useEffect(() => {
    const fetchLoads = async () => {
        // Mock data logic for UI consistency (API call logic is preserved)
        const mockLoads: Load[] = Array(15).fill(0).map((_, index) => ({
            id: index + 100,
            pickupLocation: index % 3 === 0 ? "Gwalior,M.P" : "Delhi,N.C.R",
            dropoffLocation: index % 3 === 1 ? "Mumbai,MH" : "Indore,M.P",
            commodity: index % 4 === 0 ? "Industrial Goods" : "Household Items",
            weightTons: 15,
            requiredCapacityTons: 15,
            vehicleTypeRequired: index % 2 === 0 ? "Open Truck" : "Trailer",
            freightPrice: 50000,
            expectedPickupDate: "10/10/2025",
            expectedPickupTime: "N/A",
            expectedDeliveryDate: "13/10/2025",
            loadId: `ID:29887${index}`,
            vehicleType: index % 2 === 0 ? "Truck" : "Trailer", 
            rate: 50000,
        }));
        setLoads(mockLoads);
        setLoading(false);
        
        // --- Real API Fetch Logic (Commented out for reliable mock UI) ---
        /*
        try {
            const response = await axios.get(
              "http://localhost:8080/api/bookings/status",
              { params: { status: "REQUESTED" } }
            );
            // Process API data...
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
        */
    };

    fetchLoads();
  }, []);

  const filteredLoads = loads.filter((load) => {
    
    // 1. Loading City Filter
    const matchesLoadingCity = 
        selectedLoadingCity === "All" || load.pickupLocation.includes(selectedLoadingCity);

    // 2. Unloading City Filter
    const matchesUnloadingCity = 
        selectedUnloadingCity === "All" || load.dropoffLocation.includes(selectedUnloadingCity);
        
    // 3. Vehicle Type Filter
    const matchesVehicleType =
        filterType === "All" || load.vehicleTypeRequired === filterType;
        
    // 4. Commodity Filter
    const matchesCommodity = 
        selectedCommodity === "All" || load.commodity === selectedCommodity;
        

    return matchesLoadingCity && matchesUnloadingCity && matchesVehicleType && matchesCommodity;
  });

  // Unique Filter Options
  const uniqueLoadingCities = Array.from(
    new Set(loads.map((load) => load.pickupLocation.split(",")[0]))
  );
  const uniqueUnloadingCities = Array.from(
    new Set(loads.map((load) => load.dropoffLocation.split(",")[0]))
  );
  const uniqueVehicleTypes = Array.from(
    new Set(loads.map((load) => load.vehicleTypeRequired))
  );
  const uniqueCommodities = Array.from(
    new Set(loads.map((load) => load.commodity))
  );

  const handleDetailsClick = useCallback((load: Load) => {
    setSelectedLoad(load);
  }, []);

  // --- Main Render ---
  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl text-gray-600">
        <FaSpinner className="animate-spin mr-2" /> Fetching load opportunities...
      </div>
    );
  }

  // Helper component for Dropdowns
  const FilterDropdown = ({ title, options, value, onChange }: { title: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => (
    <select
      value={value}
      onChange={onChange}
      className="flex-1 py-2 bg-[#1A1F26] text-gray-200 rounded-lg font-medium text-sm border border-gray-700 focus:ring-violet-500 focus:border-violet-500 appearance-none px-3"
    >
      <option value="All">{title} (All)</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );


  return (
    // Main Content Container
    <div
        style={{
            marginLeft: sidebarWidth,
            transition: "margin-left 300ms ease",
        }}
        className="min-h-screen bg-[#1A1F26] text-gray-100 transition-colors duration-300"
    >
      <TransporterHeader />

      {selectedLoad && (
        <LoadDetailsModal load={selectedLoad} onClose={() => setSelectedLoad(null)} />
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- Left Column: Search Filters & Load Cards --- */}
        <div className="md:col-span-2 space-y-6">
          
          <h2 className="text-xl font-bold text-white">Search load</h2>
          
          {/* Filter Bar (UPDATED with Dropdowns) */}
          <div className="flex gap-4 p-4 rounded-xl bg-[#3C3D3F]">
            
            {/* Loading City Dropdown */}
            <FilterDropdown
                title="Select Loading City"
                options={uniqueLoadingCities}
                value={selectedLoadingCity}
                onChange={(e) => setSelectedLoadingCity(e.target.value)}
            />
            
            {/* Unloading City Dropdown */}
            <FilterDropdown
                title="Select Unloading City"
                options={uniqueUnloadingCities}
                value={selectedUnloadingCity}
                onChange={(e) => setSelectedUnloadingCity(e.target.value)}
            />
            
            {/* Vehicle Type Dropdown */}
            <FilterDropdown
                title="Select Vehicle Type"
                options={uniqueVehicleTypes}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            />
            
            {/* Commodity Dropdown */}
            <FilterDropdown
                title="Select Commodity"
                options={uniqueCommodities}
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
            />
          </div>

          {/* Load Cards Grid with SCROLLING */}
          <div className="overflow-y-auto pr-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLoads.length > 0 ? (
                filteredLoads.map((load) => (
                  <LoadCard key={load.id} load={load} onDetailsClick={handleDetailsClick} />
                ))
              ) : (
                <div className="lg:col-span-2 p-10 text-center bg-[#3C3D3F] rounded-xl border border-dashed border-gray-600 shadow-inner">
                  <FaTruckLoading className="w-12 h-12 text-violet-500 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-gray-200">
                    No shipments matched your current search criteria.
                  </p>
                  <p className="text-gray-400">
                    Please clear your filters or try a broader search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Right Column: Customer Requests & Accepted Loads (Scrollable) --- */}
        <div className="md:col-span-1 space-y-6">
            
            {/* Customer Request Section */}
            <div className="p-4 rounded-xl bg-[#3C3D3F] shadow-lg">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-white">Customer request</h2>
                <div className="space-y-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {MOCK_SIDEBAR_DATA.map((item, index) => (
                        <div key={`req-${index}`} className="p-3 rounded-lg bg-[#1A1F26] hover:bg-violet-900 transition text-sm cursor-pointer">
                            <p className="font-semibold text-white">{item.location}</p>
                            <p className="text-gray-400">{item.commodity}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accepted Loads Section */}
            <div className="p-4 rounded-xl bg-[#3C3D3F] shadow-lg">
                <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-white">Accepted Loads</h2>
                <div className="space-y-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {MOCK_SIDEBAR_DATA.slice(0, 7).map((item, index) => (
                        <div key={`acc-${index}`} className="p-3 rounded-lg bg-[#1A1F26] hover:bg-violet-900 transition text-sm cursor-pointer">
                            <p className="font-semibold text-white">{item.location}</p>
                            <p className="text-gray-400">{item.commodity}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}