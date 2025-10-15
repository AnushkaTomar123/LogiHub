"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  
  FaPhoneAlt,
  FaTruckMoving,
  FaStar,
  FaIdCard,
} from "react-icons/fa";
import {
  MdAssignmentAdd,
  MdDeleteForever,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";

export default function DriverManagement() {
  const [showProfile, setShowProfile] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverList, setDriverList] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      truck: "MH 14 AB 2345",
      phone: "+91 9876543210",
      rating: 4.7,
      status: "Active Trip",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "Vikas Yadav",
      truck: "MP 09 CD 9876",
      phone: "+91 9123456789",
      rating: 4.3,
      status: "Available",
      image: "https://i.pravatar.cc/150?img=25",
    },
    {
      id: 3,
      name: "Suresh Meena",
      truck: "GJ 10 EF 1122",
      phone: "+91 9812345670",
      rating: 4.8,
      status: "On Leave",
      image: "https://i.pravatar.cc/150?img=31",
    },
  ]);

  // ------------------- HANDLERS -------------------
  const handleViewProfile = (driver) => {
    setSelectedDriver(driver);
    setShowProfile(true);
  };

  const handleAssignTrip = (driver) => {
    setSelectedDriver(driver);
    setShowAssign(true);
  };

  const handleRemoveDriver = (driver) => {
    setSelectedDriver(driver);
    setShowRemove(true);
  };

  const confirmRemoveDriver = () => {
    setDriverList(driverList.filter((d) => d.id !== selectedDriver.id));
    setShowRemove(false);
    setSelectedDriver(null);
  };

  // ------------------- UI -------------------
  return (
    <div className="bg-gradient-to-b from-[#f9fafb] to-[#e9eef5] min-h-screen py-10 px-6 sm:px-10 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 border-l-4 border-blue-600 pl-3">
        Driver Management
      </h1>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {driverList.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-blue-600 p-5"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={driver.image}
                alt={driver.name}
                width={64}
                height={64}
                className="rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {driver.name}
                </h2>
                <p
                  className={`text-sm font-medium ${
                    driver.status === "Active Trip"
                      ? "text-green-600"
                      : driver.status === "Available"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {driver.status}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaTruckMoving className="text-blue-500" /> Truck:{" "}
                <span className="font-medium">{driver.truck}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-500" /> Phone:{" "}
                <span className="font-medium">{driver.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-500" /> Rating:{" "}
                <span className="font-medium">{driver.rating}</span>
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleViewProfile(driver)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all text-sm font-medium"
              >
                View Profile
              </button>
              <button
                onClick={() => handleAssignTrip(driver)}
                className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium flex items-center justify-center gap-1"
              >
                <MdAssignmentAdd size={18} /> Assign Trip
              </button>
              <button
                onClick={() => handleRemoveDriver(driver)}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition-all text-sm font-medium flex items-center justify-center gap-1"
              >
                <MdDeleteForever size={18} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Profile Modal */}
      {showProfile && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <div className="text-center">
              <Image
                src={selectedDriver.image}
                alt={selectedDriver.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-3 border-2 border-gray-200"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedDriver.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedDriver.status}</p>
            </div>

            <div className="text-gray-700 space-y-2">
              <p className="flex items-center gap-2">
                <FaIdCard className="text-blue-500" /> Truck Assigned:{" "}
                <span className="font-medium">{selectedDriver.truck}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-500" /> Contact:{" "}
                <span className="font-medium">{selectedDriver.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaStar className="text-yellow-500" /> Performance:{" "}
                <span className="font-medium">{selectedDriver.rating}/5</span>
              </p>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setShowProfile(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Trip Modal */}
      {showAssign && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowAssign(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Assign Trip to {selectedDriver.name}
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Route
                </label>
                <select className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2">
                  <option>Delhi → Mumbai</option>
                  <option>Pune → Jaipur</option>
                  <option>Indore → Surat</option>
                  <option>Lucknow → Bhopal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowAssign(false)}
                className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                <MdCheckCircle size={20} /> Confirm Assignment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Remove Confirmation */}
      {showRemove && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Remove Driver?
            </h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-red-600">
                {selectedDriver.name}
              </span>{" "}
              from your fleet?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmRemoveDriver}
                className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowRemove(false)}
                className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
