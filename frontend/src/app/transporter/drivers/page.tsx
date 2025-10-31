"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDeleteForever, MdClose, MdPeople, MdStar, MdEdit, MdVisibility } from "react-icons/md";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import { useTheme } from "next-themes";

// --- START: Interfaces and Mock Data for UI Layout ---

// API से आने वाले Driver डेटा को दर्शाता है।
interface Driver {
  id: number;
  driverName: string;
  licenseNumber: string;
  phoneNumber: string;
  transporterId?: number;
  // UI के लिए अतिरिक्त fields (API से नहीं आ रहे हैं, इसलिए mock/default उपयोग करेंगे)
  status?: "Available" | "Off Duty" | "On Duty" | "Unavailable";
  rating?: number; // 0.0 to 5.0
}

// Summary Card के लिए Mock Data (API से नहीं आ रहा है)
const MOCK_SUMMARY_DATA = {
  totalDrivers: 134, // यह real driverList.length से बदल सकता है
  availableDrivers: 105, 
  activeAssigned: 84, 
  unavailable: 29,
};

// Top Rated Section के लिए Mock Data (API से नहीं आ रहा है)
const MOCK_RATING_DATA = [
    { name: "Ram Thakur", rating: 4.9 },
    { name: "Ram Thakur", rating: 4.5 },
    { name: "Ram Thakur", rating: 4.7 },
    { name: "Ram Thakur", rating: 4.9 },
    { name: "Ram Thakur", rating: 4.5 },
    { name: "Ram Thakur", rating: 4.7 },
];

// Status Generator (Real API में यह field आना चाहिए)
const getDriverStatus = (driverId: number): Driver['status'] => {
    switch (driverId % 4) {
        case 0: return "Available";
        case 1: return "Off Duty";
        case 2: return "On Duty";
        default: return "Available"; // Fallback to Available
    }
};

// Reusable Star Rating Component (to match the screenshot)
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <MdStar 
        key={i} 
        size={18} 
        className={i < fullStars ? "text-yellow-400" : "text-gray-600 dark:text-gray-500"} 
      />
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="flex">{stars}</div>
      <span className="text-xs text-gray-400">({rating.toFixed(1)})</span>
    </div>
  );
};


// Summary Card Component
const SummaryCard = ({ title, count, bgColor }: { title: string, count: number, bgColor: string }) => (
    <div className={`p-4 rounded-xl shadow-md ${bgColor} text-white font-semibold flex flex-col justify-between h-32`}>
      <p className="text-md text-gray-400">{title}</p>
      <p className="text-3xl text-white">{count}</p>
    </div>
);

// Driver Detail Row Component
const DriverDetailRow = ({ driver, onView, onEdit }: { driver: Driver, onView: () => void, onEdit: () => void }) => {
    // Mock status based on driver ID as status is not in the current API response
    const status = getDriverStatus(driver.id); 

    let statusClass = "text-gray-400 dark:text-gray-500";
    if (status === "Available") statusClass = "text-green-500 font-medium";
    if (status === "On Duty") statusClass = "text-yellow-500 font-medium";
    if (status === "Off Duty" || status === "Unavailable") statusClass = "text-red-500 font-medium";

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-700 dark:border-gray-800">
            <div className="flex items-center gap-3 w-1/3">
                {/* Placeholder for Profile Icon */}
                <MdPeople size={24} className="text-gray-400" />
                <div>
                    <p className="text-sm font-medium">{driver.driverName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Truck driver</p>
                </div>
            </div>
            {/* Status (Mocked) */}
            <p className={`text-sm ${statusClass} w-1/4`}>{status}</p>
            
            <div className="flex gap-2">
                {/* View Button */}
                <button 
                    onClick={onView}
                    className="text-sm px-4 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center gap-1"
                >
                    View
                </button>
                
                {/* Edit Button */}
                <button 
                    onClick={onEdit}
                    className="text-sm px-4 py-1 rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors flex items-center gap-1"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

// Top Rated Driver Item Component
const TopRatedDriverItem = ({ name, rating }: { name: string, rating: number }) => (
    <div className="flex flex-col gap-1 p-3 rounded-lg bg-[#151c27] border-b border-gray-700 dark:border-gray-800 last:border-b-0">
        <p className="text-sm font-medium text-gray-200">{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Truck driver</p>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Rating Out Of 5:</span>
            <StarRating rating={rating} />
        </div>
    </div>
);

// --- END: Interfaces and Mock Data for UI Layout ---


export default function DriverManagement() {
    // --- State Hooks ---
    const [driverList, setDriverList] = useState<Driver[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [newDriver, setNewDriver] = useState({
        driverName: "",
        licenseNumber: "",
        phoneNumber: "",
    });
    const [transporterId, setTransporterId] = useState<number | null>(null);
    const { theme } = useTheme();

    // Sidebar collapse tracking (kept from original)
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
    // --- End State Hooks ---

    // ✅ API Integration: Fetch Transporter ID and Drivers
    // Fetch Transporter by Email
    useEffect(() => {
        const fetchTransporterByEmail = async () => {
            const email = localStorage.getItem("email");
            if (!email) {
                console.error("Email not found. Cannot fetch transporter ID.");
                return;
            }

            try {
                // Assuming this API returns { id: number, ... }
                const res = await axios.get(
                    `http://localhost:8080/api/transporters/by-email?email=${email}`
                );
                const id = res.data.id;
                setTransporterId(id);
                localStorage.setItem("transporterId", id.toString());
            } catch (err) {
                console.error("❌ Error fetching transporter:", err);
            }
        };
        fetchTransporterByEmail();
    }, []);

    // Fetch Drivers when transporterId is ready
    const fetchDrivers = async (id: number) => {
        try {
            const res = await axios.get<Driver[]>(
                `http://localhost:8080/api/transporters/drivers/${id}`
            );
            setDriverList(res.data);
            // Optionally update MOCK_SUMMARY_DATA.totalDrivers here
            MOCK_SUMMARY_DATA.totalDrivers = res.data.length; 
        } catch (err) {
            console.error("❌ Error fetching drivers:", err);
        }
    };
    
    useEffect(() => {
        if (transporterId) fetchDrivers(transporterId);
    }, [transporterId]);
    // ✅ End API Integration

    // ✅ Add Driver (Active API Call)
    const handleAddDriver = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = transporterId || Number(localStorage.getItem("transporterId"));
        if (!id) {
            alert("Transporter ID not found. Please wait.");
            return;
        }

        const driverToAdd = { ...newDriver, transporterId: id };
        try {
            await axios.post(
                "http://localhost:8080/api/transporters/drivers/add",
                driverToAdd,
                { headers: { "Content-Type": "application/json" } }
            );
            alert("Driver added successfully!");
            if (id) fetchDrivers(id); // Refresh the list
            setShowAddModal(false);
            setNewDriver({ driverName: "", licenseNumber: "", phoneNumber: "" });
        } catch (err) {
            console.error("❌ Error adding driver:", err);
            alert("Failed to add driver.");
        }
    };

    // ✅ Delete Driver (Active API Call)
    const confirmRemoveDriver = async () => {
        if (!selectedDriver) return;
        const id = transporterId || Number(localStorage.getItem("transporterId"));
        
        try {
            await axios.delete(
                `http://localhost:8080/api/transporters/drivers/${selectedDriver.id}`
            );
            alert(`Driver ${selectedDriver.driverName} removed successfully!`);
            if (id) fetchDrivers(id); // Refresh the list
            setShowRemove(false);
            setSelectedDriver(null);
        } catch (err) {
            console.error("❌ Error deleting driver:", err);
            alert("Failed to delete driver.");
        }
    };

    // --- UI Logic and Handlers ---
    const sidebarWidth = sidebarCollapsed ? 80 : 256;

    const handleViewDriver = (driver: Driver) => {
        setSelectedDriver(driver);
        setShowProfile(true);
    };

    const handleEditDriver = (driver: Driver) => {
        setSelectedDriver(driver);
        // In a real application, you'd show an edit modal or navigate to an edit form
        alert(`Initiating edit for driver: ${driver.driverName}`);
    };
    // --- End UI Logic ---

    return (
        <div
            style={{
                marginLeft: sidebarWidth,
                transition: "margin-left 300ms ease",
            }}
            className={`min-h-screen flex flex-col bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        >
            {/* ✅ Top Header */}
            <TransporterHeader />

            {/* --- Main Page Content (Screenshot Layout) --- */}
            <div className="p-6 transition-all duration-300">
                
                {/* Title and Add Driver Button */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Driver Management</h1>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700 transition flex items-center gap-2"
                    >
                        Add Driver
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <SummaryCard 
                        title="Total Drivers" 
                        // Real data if available, otherwise mock data
                        count={driverList.length > 0 ? driverList.length : MOCK_SUMMARY_DATA.totalDrivers} 
                        bgColor="bg-[#2c3e50] dark:bg-card" 
                    />
                    <SummaryCard 
                        title="Available Drivers" 
                        count={MOCK_SUMMARY_DATA.availableDrivers} 
                        bgColor="bg-[#2c3e50] dark:bg-card" 
                    />
                    <SummaryCard 
                        title="Active / Assigned" 
                        count={MOCK_SUMMARY_DATA.activeAssigned} 
                        bgColor="bg-[#2c3e50] dark:bg-card" 
                    />
                    <SummaryCard 
                        title="Unavailable" 
                        count={MOCK_SUMMARY_DATA.unavailable} 
                        bgColor="bg-[#2c3e50] dark:bg-card" 
                    />
                </div>
                
                {/* Main Content: Driver Details and Top Rating */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Driver Details (Table-like section) */}
                    <div className="md:col-span-2 p-6 rounded-xl shadow-lg bg-white dark:bg-card border border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-semibold mb-4">Driver Details</h2>
                        <div className="space-y-1">
                            {driverList.length > 0 ? (
                                driverList.map((driver) => (
                                    <DriverDetailRow 
                                        key={driver.id} 
                                        driver={driver} 
                                        onView={() => handleViewDriver(driver)}
                                        onEdit={() => handleEditDriver(driver)}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    {transporterId === null ? "Loading drivers..." : "No drivers found for this transporter."}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Top Rating Section */}
                    <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-card border border-gray-200 dark:border-border">
                        <h2 className="text-xl font-semibold mb-4 text-violet-600">Top Rating</h2>
                        <div className="space-y-1">
                            {MOCK_RATING_DATA.map((driver, index) => (
                                <TopRatedDriverItem key={index} name={driver.name} rating={driver.rating} />
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* ✅ Modals for Add / Profile / Remove (unchanged) */}
            {showAddModal && (
                <Modal onClose={() => setShowAddModal(false)} title="Add New Driver">
                    <form onSubmit={handleAddDriver} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Driver Name"
                            value={newDriver.driverName}
                            onChange={(e) =>
                                setNewDriver({ ...newDriver, driverName: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-card rounded-lg px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="License Number"
                            value={newDriver.licenseNumber}
                            onChange={(e) =>
                                setNewDriver({ ...newDriver, licenseNumber: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-card rounded-lg px-3 py-2"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={newDriver.phoneNumber}
                            onChange={(e) =>
                                setNewDriver({ ...newDriver, phoneNumber: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-card rounded-lg px-3 py-2"
                            required
                        />
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                            >
                                Add Driver
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {showProfile && selectedDriver && (
                <Modal onClose={() => setShowProfile(false)} title="Driver Profile">
                    <div className="flex flex-col items-center text-gray-700 dark:text-gray-200">
                        {/* Note: Image URL uses driver ID as seed */}
                        <Image
                            src={`https://i.pravatar.cc/150?u=${selectedDriver.id}`}
                            alt="Profile"
                            width={100}
                            height={100}
                            className="rounded-full mb-4 border"
                        />
                        <p><strong>Name:</strong> {selectedDriver.driverName}</p>
                        <p><strong>License No:</strong> {selectedDriver.licenseNumber}</p>
                        <p><strong>Phone:</strong> {selectedDriver.phoneNumber}</p>
                        <p><strong>Status:</strong> {getDriverStatus(selectedDriver.id)}</p>
                    </div>
                </Modal>
            )}

            {showRemove && selectedDriver && (
                <Modal onClose={() => setShowRemove(false)} title={`Remove ${selectedDriver.driverName}?`}>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={confirmRemoveDriver}
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                        >
                            Yes, Remove
                        </button>
                        <button
                            onClick={() => setShowRemove(false)}
                            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// ✅ Reusable Modal Component (unchanged)
function Modal({
    children,
    title,
    onClose,
}: {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}) {
    // ... (Modal implementation is unchanged)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-200"
                >
                    <MdClose size={24} />
                </button>
                <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
                {children}
            </div>
        </div>
    );
}