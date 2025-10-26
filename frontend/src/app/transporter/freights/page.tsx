"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
    FaTruckLoading,FaWeightHanging, FaCalendarAlt, 
    FaSearch, FaFilter,  FaAngleRight, FaEye, FaBox, FaRoad, 
    FaShippingFast, FaCheckCircle, FaTimes, FaRupeeSign, FaSpinner, FaPhoneAlt 
} from 'react-icons/fa';
//import axios from 'axios';
import TransporterHeader from '@/components/transporter/TransporterHeader';

// --- Interfaces (Retained) ---
interface Load {
    id: number;
    pickupLocation: string;
    dropoffLocation: string;
    commodity: string; // <--- COMMODITY IS HERE
    weightTons: number;
    vehicleTypeRequired: string;
    requiredCapacityTons: number; 
    expectedPickupDate: string; 
    expectedPickupTime: string; 
    expectedDeliveryDate: string; 
    freightPrice: number;
}

// --- Mock Data (Retained) ---
const mockLoads: Load[] = [
    {
        id: 1001,
        pickupLocation: "Mumbai, MH (Bhiwandi)",
        dropoffLocation: "Delhi, DL (Narela)",
        commodity: "Industrial Pipes",
        weightTons: 15.5,
        requiredCapacityTons: 20,
        vehicleTypeRequired: "Open Truck",
        freightPrice: 55000,
        expectedPickupDate: "2024-10-30",
        expectedPickupTime: "10:00 AM",
        expectedDeliveryDate: "2024-11-02",
    },
    {
        id: 1002,
        pickupLocation: "Bangalore, KA (Peenya)",
        dropoffLocation: "Chennai, TN (Guindy)",
        commodity: "Consumer Goods",
        weightTons: 4.8,
        requiredCapacityTons: 7,
        vehicleTypeRequired: "Closed Container",
        freightPrice: 32000,
        expectedPickupDate: "2024-10-28",
        expectedPickupTime: "04:30 PM",
        expectedDeliveryDate: "2024-10-30",
    },
    {
        id: 1003,
        pickupLocation: "Pune, MH (Chakan)",
        dropoffLocation: "Hyderabad, TS (Gachibowli)",
        commodity: "Automotive Parts",
        weightTons: 8,
        requiredCapacityTons: 9,
        vehicleTypeRequired: "Taurus Truck",
        freightPrice: 40000,
        expectedPickupDate: "2024-11-01",
        expectedPickupTime: "09:00 AM",
        expectedDeliveryDate: "2024-11-03",
    },
];

// --- Modal Component (Retained) ---
const LoadDetailsModal: React.FC<{ load: Load, onClose: () => void }> = ({ load, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
                
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-blue-50 dark:bg-gray-700 rounded-t-xl">
                    <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Load Details & Quote</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 p-2"><FaTimes size={20} /></button>
                </div>

                {/* Modal Body: Details */}
                <div className="p-6 space-y-5">
                    
                    {/* Route & Price Banner */}
                    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Route:</p>
                            <p className="text-xl font-extrabold text-blue-800 dark:text-blue-300">{load.pickupLocation} <FaAngleRight className='inline mx-1' /> {load.dropoffLocation}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Freight Offer:</p>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400 flex items-center"><FaRupeeSign className='w-4 h-4'/>{load.freightPrice.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Operational Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1"><FaBox className='text-orange-500' /> Commodity:</p>
                            <p className="font-bold text-gray-900 dark:text-gray-50">{load.commodity}</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1"><FaWeightHanging className='text-orange-500' /> Weight / Capacity:</p>
                            <p className="font-bold text-gray-900 dark:text-gray-50">{load.weightTons} T / {load.requiredCapacityTons} T</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1"><FaCalendarAlt className='text-orange-500' /> Pickup By:</p>
                            <p className="font-bold text-gray-900 dark:text-gray-50">{load.expectedPickupDate} ({load.expectedPickupTime})</p>
                        </div>
                        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1"><FaShippingFast className='text-orange-500' /> Delivery By:</p>
                            <p className="font-bold text-gray-900 dark:text-gray-50">{load.expectedDeliveryDate}</p>
                        </div>
                        {/* Example Placeholder for Customer/Contact Info */}
                        <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 col-span-2">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1"><FaPhoneAlt className='text-orange-500' /> Shipper Contact:</p>
                            <p className="font-bold text-gray-900 dark:text-gray-50">Contact via Platform after Acceptance</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer: Action */}
                <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-b-xl flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => alert(`Bid placed for Load ${load.id}`)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <FaCheckCircle /> Place Bid / Accept Load
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- LoadCard Component (FIXED: Commodity Added) ---
const LoadCard: React.FC<{ load: Load, onDetailsClick: (load: Load) => void }> = ({ load, onDetailsClick }) => (
    <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition duration-200">
        
        {/* Route Header */}
        <div className="flex justify-between items-start pb-3 mb-3 border-b border-gray-100">
            <div>
                <span className="text-xs font-medium text-gray-500 uppercase">Route:</span>
                <p className="text-lg font-bold text-gray-900 flex items-center">
                    {load.pickupLocation.split(',')[0]} 
                    <FaAngleRight className='text-sm mx-1 text-blue-500' /> 
                    {load.dropoffLocation.split(',')[0]}
                </p>
            </div>
            <div className='text-right'>
                <span className="text-xs font-medium text-gray-500 block">Offer:</span>
                <span className="text-xl font-bold text-green-700 flex items-center">
                    <FaRupeeSign className='w-3 h-3'/>{load.freightPrice.toLocaleString('en-IN')}
                </span>
            </div>
        </div>

        {/* Operational Timeline and Specs */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
            
            {/* NEW: Commodity Field Added */}
            <div className="flex flex-col">
                <p className="font-medium text-gray-500 flex items-center gap-1"><FaBox className='text-blue-500 w-3 h-3' /> Commodity:</p>
                <p className='text-gray-900 font-semibold'>{load.commodity}</p>
            </div>

            {/* Weight / Capacity */}
            <div className="flex flex-col">
                <p className="font-medium text-gray-500 flex items-center gap-1"><FaWeightHanging className='text-red-500 w-3 h-3' /> Load/Capacity:</p>
                <p className='text-gray-900 font-semibold'>{load.weightTons} T / {load.requiredCapacityTons} T</p>
            </div>
            
            {/* Pickup Date/Time */}
            <div className="flex flex-col">
                <p className="font-medium text-gray-500 flex items-center gap-1"><FaCalendarAlt className='text-orange-500 w-3 h-3' /> Pickup By:</p>
                <p className='text-gray-900 font-semibold'>{load.expectedPickupDate}</p>
                <span className='text-xs text-gray-600'>{load.expectedPickupTime}</span>
            </div>
            
            {/* Delivery Date */}
            <div className="flex flex-col">
                <p className="font-medium text-gray-500 flex items-center gap-1"><FaShippingFast className='text-blue-500 w-3 h-3' /> Deliver By:</p>
                <p className='text-gray-900 font-semibold'>{load.expectedDeliveryDate}</p>
            </div>
        </div>

        {/* Action Button */}
        <button 
            onClick={() => onDetailsClick(load)}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 text-sm"
        >
            <FaEye /> View Full Details 
        </button>
    </div>
);


// --- Main Load Board Component ---
export default function LoadBoardPage() {
    const [loads, setLoads] = useState<Load[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

    // --- Data Fetching ---
    useEffect(() => {
        setTimeout(() => {
            setLoads(mockLoads);
            setLoading(false);
        }, 800);
    }, []);

    // --- Enhanced Search and Filter Logic ---
    const filteredLoads = loads.filter(load => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        // Search Algo checks all relevant fields including capacity
        const matchesSearch = load.pickupLocation.toLowerCase().includes(lowerSearchTerm) ||
                              load.dropoffLocation.toLowerCase().includes(lowerSearchTerm) ||
                              load.commodity.toLowerCase().includes(lowerSearchTerm) || // Commodity Search
                              load.vehicleTypeRequired.toLowerCase().includes(lowerSearchTerm) ||
                              String(load.requiredCapacityTons).includes(lowerSearchTerm) || 
                              String(load.weightTons).includes(lowerSearchTerm); 
        
        // Vehicle Type Filter
        const matchesFilter = filterType === 'All' || load.vehicleTypeRequired === filterType;

        return matchesSearch && matchesFilter;
    });

    const uniqueVehicleTypes = Array.from(new Set(loads.map(load => load.vehicleTypeRequired)));

    const handleDetailsClick = useCallback((load: Load) => {
        setSelectedLoad(load);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-xl text-gray-600">
                <FaSpinner className="animate-spin mr-2" /> Searching for **Load Opportunities**...
            </div>
        );
    }

    return (
        
        <div className="p-0 bg-white min-h-full text-gray-800 rounded-xl ">
        <TransporterHeader/>
            
            {/* Modal Renderer */}
            {selectedLoad && <LoadDetailsModal load={selectedLoad} onClose={() => setSelectedLoad(null)} />}

            {/* Main Title - Clean and Professional (Smaller Font) */}
            <h1 className="text-xl font-semibold mt-6 flex items-center gap-3 text-gray-800 pb-3 border-gray-300">
                <FaRoad className='text-blue-600' /> Active Load Marketplace 
            </h1>
            
            {/* Search and Filter Controls */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center border border-gray-200">
                
                {/* Search Input */}
                <div className="relative w-full md:w-5/12">
                    <input
                        type="text"
                        placeholder="Search city, commodity, capacity (tons)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 transition"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>

                {/* Vehicle Type Filter Dropdown */}
                <div className="w-full md:w-5/12">
                    <div className="relative">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 appearance-none pr-10 transition font-medium"
                        >
                            <option value="All">Filter by Vehicle Type (All)</option>
                            {uniqueVehicleTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>
                </div>
                
                <span className="text-base font-bold text-blue-600 md:w-2/12 text-center">
                    {filteredLoads.length} Loads Active
                </span>
            </div>

            {/* Load Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredLoads.length > 0 ? (
                    filteredLoads.map(load => (
                        <LoadCard 
                            key={load.id} 
                            load={load} 
                            onDetailsClick={handleDetailsClick} 
                        />
                    ))
                ) : (
                    <div className="lg:col-span-2 p-10 text-center bg-white rounded-xl border border-dashed border-gray-400 shadow-inner">
                        <FaTruckLoading className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-xl font-semibold text-gray-700">No shipments matched your current search criteria.</p>
                        <p className="text-gray-500">Please clear your filters or try a broader search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}