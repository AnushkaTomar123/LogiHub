"use client";

import TransporterHeader from "../../../components/TransporterSection/TransporterHeader";
import React, { useState, useEffect, FormEvent } from "react";
import { FaMapMarkerAlt, FaTruckMoving, FaUserAlt, FaRoute, FaCheckCircle, FaSpinner, FaMapPin, FaAngleRight } from "react-icons/fa";
import { MdAccessTimeFilled, MdClose, MdPeople, MdLocalShipping, MdPerson } from "react-icons/md";
//import axios from "axios";


interface Vehicle {
    id: number;
    vehicleNumber: string;
    maxCapacityTons: number;
    vehicleType: string;
}

interface Driver {
    id: number;
    name: string;
}

interface Trip {
    id: number;
    truck: string;
    driver: string;
    route: string;
    status: 'In Transit' | 'Departed' | 'Idle' | 'Completed';
    eta: string;
    loadId: number; 
}

// --- MOCK API DATA (for demonstration) ---
const mockAvailableDrivers: Driver[] = [
    { id: 101, name: "Ravi Kumar (ID: 101)" },
    { id: 102, name: "Vikas Yadav (ID: 102)" },
];

const mockAvailableVehicles: Vehicle[] = [
    { id: 201, vehicleNumber: "MH 14 AB 2345", maxCapacityTons: 20, vehicleType: "Open Truck" },
    { id: 202, vehicleNumber: "MP 09 CD 9876", maxCapacityTons: 10, vehicleType: "Closed Van" },
    { id: 203, vehicleNumber: "DL 01 XY 7788", maxCapacityTons: 30, vehicleType: "Trailer" },
];

const mockLoadOptions = [
    { id: 9001, name: "Load #9001: Mumbai → Chennai" },
    { id: 9002, name: "Load #9002: Delhi → Surat" },
    { id: 9003, name: "Load #9003: Pune → Hyderabad" },
];

const mockTrips: Trip[] = [
    { id: 1, truck: "MH 14 AB 2345", driver: "Ravi Kumar", route: "Indore → Pune", status: "In Transit", eta: "3 hrs 20 mins", loadId: 9001 },
    { id: 2, truck: "MP 09 CD 9876", driver: "Vikas Yadav", route: "Bhopal → Jaipur", status: "Departed", eta: "5 hrs 15 mins", loadId: 9002 },
    { id: 3, truck: "GJ 10 EF 1122", driver: "Suresh Meena", route: "Delhi → Surat", status: "Idle", eta: "Waiting for dispatch", loadId: 9003 },
];


const AssignTripModal: React.FC<{
    onClose: () => void;
    drivers: Driver[];
    vehicles: Vehicle[];
    onTripAssigned: (newTrip: Trip) => void;
}> = ({ onClose, drivers, vehicles, onTripAssigned }) => {
    const [selectedLoad, setSelectedLoad] = useState(''); 
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);
    
    const isFormValid = selectedLoad && selectedDriver && selectedVehicle;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsAssigning(true);
        
        const driverName = drivers.find(d => String(d.id) === selectedDriver)?.name || "Unknown Driver";
        const vehicleNum = vehicles.find(v => String(v.id) === selectedVehicle)?.vehicleNumber || "Unknown Truck";

        try {
           
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // NOTE: The backend should return the full trip object, but we mock it here.
            onTripAssigned({
                id: Math.floor(Math.random() * 10000), 
                truck: vehicleNum,
                driver: driverName.split(' ')[0], // Simpler driver name for card
                route: "DYNAMIC ROUTE", // Assuming backend calculates this
                status: "Departed",
                eta: "TBD",
                loadId: Number(selectedLoad),
            });

            onClose(); 

        } catch (error) {
            console.error("Assignment Failed:", error);
            alert("Failed to assign trip. Check API status.");
        } finally {
            setIsAssigning(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-100 dark:bg-background bg-opacity-70 flex items-center justify-center z-50 p-4">
          
            <div className="bg-white dark:bg-background w-[90%] max-w-xl rounded-2xl shadow-2xl p-6 relative">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Assign New Trip</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Select Load (Pending Acceptance) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><FaRoute size={14} className="text-violet-500" /> Select Load to Assign</label>
                        <select
                            value={selectedLoad}
                            onChange={(e) => setSelectedLoad(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 font-medium"
                        >
                            <option value="">Select a Load...</option>
                            {mockLoadOptions.map(load => (
                                <option key={load.id} value={load.id}>
                                    {load.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select Vehicle */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdLocalShipping size={16} className="text-violet-500" /> Select Available Vehicle</label>
                        <select
                            value={selectedVehicle}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 font-medium"
                            disabled={vehicles.length === 0 || isAssigning}
                        >
                            <option value="">Select Vehicle (Available: {vehicles.length})</option>
                            {vehicles.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.vehicleNumber} ({v.maxCapacityTons}T, {v.vehicleType})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select Driver */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1"><MdPerson size={16} className="text-violet-500" /> Select Driver</label>
                        <select
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 font-medium"
                            disabled={drivers.length === 0 || isAssigning}
                        >
                            <option value="">Select Driver (Available: {drivers.length})</option>
                            {drivers.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex justify-end pt-4 gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-600 rounded-xl hover:bg-gray-100 transition font-semibold"
                            disabled={isAssigning}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isAssigning || !isFormValid}
                            className={`px-6 py-3 rounded-xl font-bold text-white transition flex items-center gap-2 ${isFormValid && !isAssigning ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {isAssigning ? <FaSpinner className="animate-spin" /> : <FaCheckCircle size={18} />}
                            {isAssigning ? "Assigning..." : "Confirm Assignment"}
                        </button>
                    </div>
                </form>
                
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <MdClose size={24} />
                </button>
            </div>
        </div>
    );
};


// --- Main Assigned Trips Component ---
export default function AssignedTrips() {
    const [showModal, setShowModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [trips, setTrips] = useState<Trip[]>(mockTrips);
    const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
    const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
    const [isLoadingData, setIsLoadingLoadingData] = useState(true);

    // 1. Fetch Drivers and Vehicles Data
    useEffect(() => {
        // NOTE: Replace these mock calls with axios.get calls to your Spring Boot backend
        
        // Mocking Data Fetch
        setTimeout(() => {
            setAvailableDrivers(mockAvailableDrivers);
            setAvailableVehicles(mockAvailableVehicles);
            setIsLoadingLoadingData(false);
        }, 800);
    }, []);

    // 2. Handler for showing Map Modal
    const handleTrackTrip = (trip: Trip) => {
        setSelectedTrip(trip);
        setShowModal(true);
    };
    
    // 3. Handler for adding a newly assigned trip to the list
    const handleTripAssigned = (newTrip: Trip) => {
        setTrips(prevTrips => [newTrip, ...prevTrips]);
        setShowAssignModal(false); // Close modal after successful assignment
    };

    return (
        <div className="bg-white dark:bg-background min-h-screen">
            <TransporterHeader/>
            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 pb-3">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Assigned Trips
                    </h1>
                    <button
                        onClick={() => setShowAssignModal(true)}
                        className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700 transition flex items-center gap-2 font-semibold"
                        disabled={isLoadingData}
                    >
                        <MdPeople size={20} /> Assign Trip
                    </button>
                </div>

                {isLoadingData ? (
                    <div className="flex justify-center items-center h-60 text-xl text-gray-500">
                        <FaSpinner className="animate-spin mr-2" /> Loading Drivers and Vehicles...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <div
                                key={trip.id}
                                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all border-t-4 border-violet-600"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FaTruckMoving className="text-2xl text-violet-600" />
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {trip.truck}
                                    </h2>
                                </div>

                                <div className="space-y-3 text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <FaUserAlt className="text-green-600" /> Driver:{" "}
                                        <span className="font-semibold text-gray-900">{trip.driver}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaRoute className="text-violet-600" /> Route:{" "}
                                        <span className="font-semibold text-gray-900">{trip.route}</span>
                                    </p>
                                    
                                    <p className="flex items-center gap-2">
                                        <MdAccessTimeFilled className="text-purple-600" /> ETA:{" "}
                                        <span className="font-semibold text-gray-900">{trip.eta}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-red-600" /> Status:{" "}
                                        <span
                                            className={`font-bold ${
                                                trip.status === "In Transit" ? "text-green-700"
                                                : trip.status === "Departed" ? "text-yellow-700"
                                                : "text-gray-500"
                                            }`}
                                        >
                                            {trip.status}
                                        </span>
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleTrackTrip(trip)}
                                    className="w-full mt-6 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700 transition-all font-bold shadow-md"
                                >
                                    Track Trip
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Tracking Modal */}
            {showModal && selectedTrip && (
                <div className="fixed inset-0 bg-gray-100 dark:bg-card bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Tracking: {selectedTrip.truck}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Driver: <span className="font-medium">{selectedTrip.driver}</span> | Route: <span className="font-medium">{selectedTrip.route}</span>
                        </p>
                        <div className="bg-gray-200 rounded-xl h-60 flex items-center justify-center text-gray-600">
                            🗺️ Real-Time Map Tracking Preview
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all font-semibold"
                        >
                            Close Tracking
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <MdClose size={24} />
                        </button>
                    </div>
                </div>
            )}
            
            {/* New: Assign Trip Modal */}
            {showAssignModal && (
                <AssignTripModal 
                    onClose={() => setShowAssignModal(false)}
                    drivers={availableDrivers}
                    vehicles={availableVehicles}
                    onTripAssigned={handleTripAssigned}
                />
            )}
        </div>
    );
}