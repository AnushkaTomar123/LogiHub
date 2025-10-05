"use client";

import { useState } from "react";
import {
  MdOutlineLocalShipping,
  MdLocationPin,
  MdOutlineArchive,
  MdPeople,
  MdTrendingUp,
  MdBarChart,
  MdSettings,
  MdNotifications,
  MdSearch,
  MdFilterList,
  MdAdd,
  MdAccessTime,
  MdRoute,
  MdCurrencyRupee,
  MdFlashOn,
  MdOutlineCheckCircle,
  MdNavigation,
  MdOutlineVisibility,
  MdPerson,
  MdLocalGasStation,
} from "react-icons/md";
import type { IconType } from "react-icons";

type Fleet = {
  id: string;
  route: string;
  status: string;
  progress: number;
  eta: string;
  distance: string;
  load: string;
};

type KPI = {
  title: string;
  value: string;
  change: string;
  icon: IconType;
  color: string;
};

type Insight = {
  title: string;
  description: string;
  type: "opportunity" | "suggestion" | "warning" | "insight";
};

type Trip = {
  id: string;
  company: string;
  route: string;
  status: string;
  payment: string;
};

const TransporterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const fleetData: Fleet[] = [
    { id: "LH-TR001", route: "Delhi → Mumbai", status: "In Transit", progress: 72, eta: "3h 40m", distance: "310 km", load: "15,000 kg" },
    { id: "LH-TR002", route: "Bangalore → Hyderabad", status: "Loading", progress: 25, eta: "6h 20m", distance: "430 km", load: "19,000 kg" },
    { id: "LH-TR003", route: "Chennai → Pune", status: "Delivered", progress: 100, eta: "Completed", distance: "520 km", load: "20,000 kg" },
    { id: "LH-TR004", route: "Kolkata → Patna", status: "In Transit", progress: 83, eta: "2h 10m", distance: "190 km", load: "17,000 kg" },
  ];

  const kpiData: KPI[] = [
    { title: "Active Vehicles", value: "98", change: "+8%", icon: MdOutlineLocalShipping, color: "bg-blue-500" },
    { title: "Assigned Trips", value: "243", change: "+12%", icon: MdRoute, color: "bg-green-500" },
    { title: "Revenue (Today)", value: "₹1.9L", change: "+18%", icon: MdCurrencyRupee, color: "bg-purple-500" },
    { title: "Fuel Efficiency", value: "92%", change: "+3%", icon: MdLocalGasStation, color: "bg-orange-500" },
  ];

  const aiInsights: Insight[] = [
    { title: "High Traffic Alert", description: "Heavy congestion on Mumbai Expressway — expect 20% delay.", type: "warning" },
    { title: "Route Optimization", description: "Use NH-44 for 12% faster delivery to Hyderabad.", type: "suggestion" },
    { title: "Fuel Alert", description: "Diesel prices expected to rise 4% next week.", type: "insight" },
    { title: "Driver Efficiency", description: "Driver Ravi Kumar achieved 98% on-time deliveries.", type: "opportunity" },
  ];

  const assignedTrips: Trip[] = [
    { id: "TRP-2024001", company: "TechCorp Pvt Ltd", route: "Delhi → Mumbai", status: "In Transit", payment: "₹24,500" },
    { id: "TRP-2024002", company: "Global Exports", route: "Bangalore → Hyderabad", status: "Delivered", payment: "₹18,900" },
    { id: "TRP-2024003", company: "TradeWings", route: "Chennai → Pune", status: "Processing", payment: "₹29,600" },
    { id: "TRP-2024004", company: "UrbanMart", route: "Kolkata → Patna", status: "Confirmed", payment: "₹16,800" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-full bg-slate-100 text-gray-800 border-r border-gray-200 shadow-sm transform ">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <MdOutlineLocalShipping className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">LogiHub</h1>
              <p className="text-sm text-slate-400">Transporter Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: "overview", label: "Dashboard", icon: MdBarChart },
              { id: "fleet", label: "Fleet Tracking", icon: MdNavigation },
              { id: "trips", label: "Assigned Trips", icon: MdOutlineArchive },
              { id: "drivers", label: "Driver Management", icon: MdPeople },
              { id: "routes", label: "Route Planning", icon: MdRoute },
              { id: "insights", label: "AI Insights", icon: MdFlashOn },
              { id: "billing", label: "Payments", icon: MdCurrencyRupee },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"
                    : "hover:bg-slate-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className=" rounded-lg p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-cent600text-gray-800  font-semibold">
              R
            </div>
            <div>
              <p className="font-medium">Rajesh Transport Co.</p>
              <p className="text-sm text-slate-400">transporter@logihub.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-">
        {/* Header */}
        
        <header className="flex justify-between items-center bg-white shadow px-6 py-4 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Transporter Dashboard</h1>
            <p className="text-slate-600 text-sm mt-1">Monitor fleet, trips, and route performance in real-time.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-white rounded-lg transition-colors">
              <MdNotifications className="w-5 h-5 text-slate-600" />
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-gray-800  px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <MdAdd className="w-4 h-4" />
              <span>New Trip</span>
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className="w-6 h600text-gray-800 " />
                </div>
                <span className="text-green-500 font-medium text-sm">{kpi.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-600 mb-1">{kpi.value}</h3>
              <p className="text-slate-600 text-sm">{kpi.title}</p>
            </div>
          ))}
        </div>

        {/* Fleet Tracking */}
        <section className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-600 flex items-center space-x-2">
              <MdNavigation className="w-5 h-5 text-blue-500" />
              <span>Fleet Tracking</span>
            </h2>
            <div className="flex items-center space-x-3">
              <MdSearch className="w-4 h-4 text-slate-400" />
              <MdFilterList className="w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="p-6 space-y-4">
            {fleetData.map((vehicle) => (
              <div key={vehicle.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        vehicle.status === "In Transit"
                          ? "bg-green-400"
                          : vehicle.status === "Loading"
                          ? "bg-yellow-400"
                          : vehicle.status === "Delivered"
                          ? "bg-blue-400"
                          : "bg-slate-400"
                      }`}
                    ></div>
                    <span className="font-semibold">{vehicle.id}</span>
                    <span className="text-slate-600">{vehicle.route}</span>
                  </div>
                  <span className="text-sm text-slate-600">{vehicle.eta}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Distance: {vehicle.distance}</span>
                  <span>Load: {vehicle.load}</span>
                  <span>Progress: {vehicle.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: `${vehicle.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assigned Trips */}
        <section className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
              <MdOutlineArchive className="w-5 h-5 text-blue-500" />
              <span>Assigned Trips</span>
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-2">
              <MdOutlineVisibility className="w-4 h-4" />
              <span>View All</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-6 text-left font-medium text-slate-600">Trip ID</th>
                  <th className="py-3 px-6 text-left font-medium text-slate-600">Company</th>
                  <th className="py-3 px-6 text-left font-medium text-slate-600">Route</th>
                  <th className="py-3 px-6 text-left font-medium text-slate-600">Status</th>
                  <th className="py-3 px-6 text-left font-medium text-slate-600">Payment</th>
                </tr>
              </thead>
              <tbody>
                {assignedTrips.map((trip) => (
                  <tr key={trip.id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="py-4 px-6 font-medium text-slate-800">{trip.id}</td>
                    <td className="py-4 px-6 text-slate-600">{trip.company}</td>
                    <td className="py-4 px-6 text-slate-600">{trip.route}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trip.status === "In Transit"
                            ? "bg-green-100 text-green-800"
                            : trip.status === "Delivered"
                            ? "bg-blue-100 text-blue-800"
                            : trip.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {trip.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">{trip.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Insights */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center space-x-2 mb-4">
            <MdFlashOn className="w-5 h-5 text-yellow-500" />
            <span>AI Insights</span>
          </h2>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-slate-800 mb-1">{insight.title}</h3>
                <p className="text-sm text-slate-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TransporterDashboard;
