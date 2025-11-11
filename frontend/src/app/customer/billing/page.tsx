"use client";

import CustomerHeader from "@/components/CustomerSection/Customerheader";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";


interface Transporter {
  id: number;
  name: string;
  location: string;
  rating: number;
  vehicles: number;
}

const transporterList: Transporter[] = [
  { id: 1, name: "Raj Logistic", location: "Delhi", rating: 4, vehicles: 22 },
  { id: 2, name: "FastMove Cargo", location: "Indore", rating: 3, vehicles: 14 },
  { id: 3, name: "Sky Transporters", location: "Kanpur", rating: 5, vehicles: 18 },
  { id: 4, name: "BlueLine Movers", location: "Mumbai", rating: 4, vehicles: 25 },
];

export default function FindTransporter() {
  const [search, setSearch] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("sidebarCollapsed") === "true";
      }
      return false;
    });
  
    useEffect(() => {
      const updateSidebar = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      };
      window.addEventListener("storage", updateSidebar);
      return () => window.removeEventListener("storage", updateSidebar);
    }, []);
    const sidebarWidth = sidebarCollapsed ? 80 : 256;
  

  const filteredTransporters = transporterList.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="bg-gray-900 rounded-lg ">
      <CustomerHeader/>
      <div className="flex justify-between items-center mt-2 mb-5 px-4">
        <h2 className="text-lg font-semibold">Find Transporter</h2>

        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-1">
          <FaSearch className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none text-white placeholder-gray-400"
          />
        </div>
      </div>

      {filteredTransporters.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredTransporters.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-lg p-4 flex justify-between items-center hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-gray-400">{t.location}</p>
                <p className="text-xs text-gray-500">{t.vehicles} Vehicles</p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <FaFaceGrinStars
                      key={idx}
                      size={14}
                      className={
                        idx < t.rating ? "text-yellow-400" : "text-gray-600"
                      }
                      fill={idx < t.rating ? "yellow" : "none"}
                    />
                  ))}
                </div>
              </div>
              <button className="text-green-400 text-sm font-semibold hover:underline">
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No transporters found.</p>
      )}
    </div>
  );
}
