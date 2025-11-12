"use client";

import CustomerHeader from "@/components/CustomerSection/Customerheader";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FaFaceGrinStars } from "react-icons/fa6";
import toast from "react-hot-toast";

interface Transporter {
  id: number;
  companyName: string;
  contactPersonName: string;
  address: string;
  totalVehicles: number;
  profilePhotoUrl?: string;
  rating?: number;
}

export default function FindTransporter() {
  const [search, setSearch] = useState("");
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const BASE_URL = "http://localhost:8080/api/transporters";

  useEffect(() => {
    fetchTransporters();

    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      const handleStorageChange = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  const fetchTransporters = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setTransporters(res.data);
    } catch {
      toast.error("Failed to fetch transporters");
    }
  };

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const filteredTransporters = transporters.filter(
    (t) =>
      t.companyName.toLowerCase().includes(search.toLowerCase()) ||
      t.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="bg-gray-900 min-h-screen rounded-lg"
    >
      <CustomerHeader />

      {/* Header & Search */}
      <div className="flex justify-between items-center mt-2 mb-5 px-4">
        <h2 className="text-lg font-semibold text-white">Find Transporter</h2>

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

      {/* Transporter Cards */}
      {filteredTransporters.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredTransporters.map((t) => (
            <div
              key={t.id}
              className="bg-gray-800 rounded-lg p-4 flex flex-col items-start hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    t.profilePhotoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full border border-gray-600"
                />
                <div>
                  <p className="font-semibold text-white">
                    {t.companyName || "Unknown Company"}
                  </p>
                  <p className="text-sm text-gray-400">{t.address}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-2">
                Contact Person: {t.contactPersonName}
              </p>
              <p className="text-xs text-gray-400 mb-2">
                Total Vehicles: {t.totalVehicles}
              </p>

              {/* Rating Stars */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, idx) => (
                  <FaFaceGrinStars
                    key={idx}
                    size={14}
                    className={
                      idx < (t.rating || 3)
                        ? "text-yellow-400"
                        : "text-gray-600"
                    }
                    fill={idx < (t.rating || 3) ? "yellow" : "none"}
                  />
                ))}
              </div>

              <button className="text-green-400 text-sm font-semibold hover:underline self-end">
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center mb-10">
          No transporters found.
        </p>
      )}
    </div>
  );
}
