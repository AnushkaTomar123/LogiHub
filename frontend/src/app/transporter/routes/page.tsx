"use client";

import TransporterHeader from "@/components/transporter/TransporterHeader";
import React, { useState } from "react";
import { FaRoute, FaClock, FaMapMarkerAlt, FaRoad } from "react-icons/fa";
import { MdAddLocationAlt, MdClose, MdCheckCircle } from "react-icons/md";

export default function RoutePlanning() {
  const [showModal, setShowModal] = useState(false);
  const [routes, setRoutes] = useState([
    {
      id: 1,
      from: "Delhi",
      to: "Mumbai",
      distance: "1,450 km",
      eta: "22 hrs",
      status: "Active",
    },
    {
      id: 2,
      from: "Pune",
      to: "Jaipur",
      distance: "1,150 km",
      eta: "18 hrs",
      status: "Completed",
    },
    {
      id: 3,
      from: "Indore",
      to: "Surat",
      distance: "510 km",
      eta: "8 hrs",
      status: "Pending",
    },
  ]);

  const [newRoute, setNewRoute] = useState({ from: "", to: "", distance: "", eta: "" });

  const handleAddRoute = () => {
    if (newRoute.from && newRoute.to && newRoute.distance && newRoute.eta) {
      setRoutes([
        ...routes,
        {
          id: routes.length + 1,
          ...newRoute,
          status: "Active",
        },
      ]);
      setNewRoute({ from: "", to: "", distance: "", eta: "" });
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white min-h-screen ">
      <TransporterHeader/>
      <div className="flex items-center justify-between mb-8 px-2 py-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Route Planning
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
        >
          <MdAddLocationAlt size={20} /> Plan New Route
        </button>
      </div>

      {/* Routes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border-t-4 transition-all
             border-blue-500"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaRoute className="text-blue-600" size={22} />
              <h2 className="text-lg font-semibold text-gray-800">
                {route.from} → {route.to}
              </h2>
            </div>

            <div className="space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaRoad className="text-blue-400" /> Distance:{" "}
                <span className="font-medium">{route.distance}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-yellow-500" /> ETA:{" "}
                <span className="font-medium">{route.eta}</span>
              </p>
              <p
                className={`flex items-center gap-2 ${
                  route.status === "Active"
                    ? "text-green-600"
                    : route.status === "Pending"
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                <FaMapMarkerAlt /> Status:{" "}
                <span className="font-medium">{route.status}</span>
              </p>
            </div>

            <button
              className="w-full mt-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            >
              View Route
            </button>
          </div>
        ))}
      </div>

      {/* ------------------ ADD ROUTE MODAL ------------------ */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Plan New Route
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  placeholder="Enter starting point"
                  value={newRoute.from}
                  onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={newRoute.to}
                  onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
                  <input
                    type="text"
                    placeholder="e.g., 1200 km"
                    value={newRoute.distance}
                    onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ETA (hrs)</label>
                  <input
                    type="text"
                    placeholder="e.g., 18 hrs"
                    value={newRoute.eta}
                    onChange={(e) => setNewRoute({ ...newRoute, eta: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <button
                onClick={handleAddRoute}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <MdCheckCircle size={20} /> Confirm Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
