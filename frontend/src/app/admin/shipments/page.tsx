"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import AdminHeader from "@/components/AdminSection/AdminHeader";

interface Shipment {
  id: number;
  customer: string;
  transporter: string;
  from: string;
  to: string;
  status: string;
  price: number;
}

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [filteredShipments, setFilteredShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/bookings/all/desc");
        const bookings = res.data || [];

        const getCustomerName = async (id: number) => {
          try {
            const res = await axios.get(`http://localhost:8080/api/customers/${id}`);
            return res.data.user?.username || `Customer #${id}`;
          } catch {
            return `Customer #${id}`;
          }
        };

        const getTransporterName = async (id: number) => {
          try {
            const res = await axios.get(`http://localhost:8080/api/transporters/${id}`);
            return res.data.user?.username || `Transporter #${id}`;
          } catch {
            return `Transporter #${id}`;
          }
        };

        const enriched = await Promise.all(
          bookings.map(async (b: any) => ({
            id: b.id,
            customer: b.customerName || (await getCustomerName(b.customerId)),
            transporter:
              b.transporterName || (await getTransporterName(b.transporterId)),
            from: b.pickupAddress || "N/A",
            to: b.dropAddress || "N/A",
            status: b.status || "Unknown",
            price: b.finalCost || b.estimatedCost || 0,
          }))
        );

        setShipments(enriched);
        setFilteredShipments(enriched);
      } catch (error) {
        console.error("❌ Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  // 🔍 Search Logic
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = shipments.filter(
      (s) =>
        s.customer.toLowerCase().includes(term) ||
        s.transporter.toLowerCase().includes(term) ||
        s.from.toLowerCase().includes(term) ||
        s.to.toLowerCase().includes(term) ||
        s.id.toString().includes(term)
    );
    setFilteredShipments(results);
  }, [searchTerm, shipments]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background transition-colors duration-300">
      <AdminHeader />

      {/* 🔹 Page Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
           All Shipments
        </h1>

        {/* Search bar */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, customer, transporter, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-[#1A1A25] text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>
      </div>

      {/* 🔹 Table Section */}
      <div className="p-4">
        <div className="overflow-x-auto bg-white dark:bg-[#11111B] border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg transition">
          {loading ? (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300 animate-pulse">
              Loading shipments...
            </div>
          ) : filteredShipments.length === 0 ? (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300">
              No shipments found 😕
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-gray-100 dark:bg-[#1D1D29] text-left text-gray-700 dark:text-gray-300 uppercase text-xs tracking-wide">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Transporter</th>
                  <th className="p-3">Source Address</th>
                  <th className="p-3">Destination Address</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`transition duration-200 hover:scale-[1.01] ${
                      i % 2 === 0
                        ? "bg-gray-50 dark:bg-[#141421]"
                        : "bg-white dark:bg-[#181825]"
                    } hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-pink-500/10 dark:hover:from-purple-500/20 dark:hover:to-pink-400/20`}
                  >
                    <td className="p-3 font-medium text-gray-700 dark:text-gray-200">
                      {s.id}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">
                      {s.customer}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">
                      {s.transporter}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">
                      {s.from}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">
                      {s.to}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        s.status === "DELIVERED"
                          ? "text-green-500"
                          : s.status === "IN_TRANSIT"
                          ? "text-blue-500"
                          : s.status === "PENDING"
                          ? "text-red-500"
                          : s.status === "CONFIRMED"
                          ? "text-yellow-500"
                          : s.status === "ACCEPTED"
                          ? "text-orange-500"
                          : "text-gray-400"
                      }`}
                    >
                      {s.status}
                    </td>
                    <td className="p-3 text-right text-gray-700 dark:text-gray-200 font-semibold">
                      ₹{(s.price ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
