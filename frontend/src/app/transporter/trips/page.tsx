"use client"

import TransporterHeader from "@/components/transporter/TransporterHeader";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaTruckMoving, FaUserAlt, FaRoute } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { MdAccessTimeFilled, MdClose,MdPeople} from "react-icons/md";

export default function AssignedTrips() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = [
    {
      id: 1,
      truck: "MH 14 AB 2345",
      driver: "Ravi Kumar",
      route: "Indore → Pune",
      status: "In Transit",
      eta: "3 hrs 20 mins",
     
    },
    {
      id: 2,
      truck: "MP 09 CD 9876",
      driver: "Vikas Yadav",
      route: "Bhopal → Jaipur",
      status: "Departed",
      eta: "5 hrs 15 mins",
     
    },
    {
      id: 3,
      truck: "GJ 10 EF 1122",
      driver: "Suresh Meena",
      route: "Delhi → Surat",
      status: "Idle",
      eta: "Waiting for dispatch",
     
    },
  ];

  const handleTrackTrip = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <TransporterHeader/>
      <div className="flex items-center justify-between mb-8 px-2 py-3">
             <h1 className="text-2xl font-bold text-gray-800">
              Assigned Trips
             </h1>
             <button
              
               className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
             >
               <MdPeople size={20} /> Assign Trip
             </button>
           </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all border-t-4 border-blue-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaTruckMoving className="text-2xl text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Truck No: {trip.truck}
              </h2>
            </div>

            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaUserAlt className="text-green-500" /> Driver:{" "}
                <span className="font-medium">{trip.driver}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaRoute className="text-blue-500" /> Route:{" "}
                <span className="font-medium">{trip.route}</span>
              </p>
              
              <p className="flex items-center gap-2">
                <MdAccessTimeFilled className="text-purple-500" /> ETA:{" "}
                <span className="font-medium">{trip.eta}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> Status:{" "}
                <span
                  className={`font-semibold ${
                    trip.status === "In Transit"
                      ? "text-green-600"
                      : trip.status === "Departed"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {trip.status}
                </span>
              </p>
            </div>

            <button
              onClick={() => handleTrackTrip(trip)}
              className="w-full mt-5 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-medium"
            >
              Track Trip
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedTrip && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Tracking: {selectedTrip.truck}
            </h2>
            <p className="text-gray-600 mb-4">
              Driver: <span className="font-medium">{selectedTrip.driver}</span>
              <br />
              Route: <span className="font-medium">{selectedTrip.route}</span>
            </p>

            {/* Mock Map Preview */}
            <div className="bg-gray-200 rounded-xl h-60 flex items-center justify-center text-gray-600">
              🗺️ Real-Time Map Tracking Preview
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg--600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
