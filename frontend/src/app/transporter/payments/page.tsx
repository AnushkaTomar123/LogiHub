"use client";

import TransporterHeader from "@/components/transporter/TransporterHeader";
import React, { useState } from "react";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPlus,
  FaRupeeSign,
  FaFilter,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function Payments() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");

  const [payments, setPayments] = useState([
    {
      id: 1,
      customer: "Rohit Sharma",
      amount: 25000,
      date: "2025-10-12",
      status: "Completed",
      method: "UPI",
    },
    {
      id: 2,
      customer: "Anjali Transport",
      amount: 18000,
      date: "2025-10-13",
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      id: 3,
      customer: "Raj Logistics",
      amount: 12000,
      date: "2025-10-11",
      status: "Failed",
      method: "Card",
    },
  ]);

  const [newPayment, setNewPayment] = useState({
    customer: "",
    amount: "",
    date: "",
    method: "",
    status: "Pending",
  });

  const total = payments.reduce((sum, p) => sum + p.amount, 0);
  const completed = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const failed = payments
    .filter((p) => p.status === "Failed")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments =
    filter === "All" ? payments : payments.filter((p) => p.status === filter);

  const handleAddPayment = () => {
    if (
      newPayment.customer &&
      newPayment.amount &&
      newPayment.date &&
      newPayment.method
    ) {
      setPayments([
        ...payments,
        {
          id: payments.length + 1,
          ...newPayment,
          amount: Number(newPayment.amount),
        },
      ]);
      setNewPayment({
        customer: "",
        amount: "",
        date: "",
        method: "",
        status: "Pending",
      });
      setShowModal(false);
    }
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen px-8 py-10 font-sans">
      <TransporterHeader/>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 border-l-4 border-green-600 pl-3">
          Payments Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
        >
          <FaPlus /> Add Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <FaCreditCard className="text-blue-500 text-2xl" />
            <span className="text-gray-500 text-sm">Total Payments</span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-gray-800">
            ₹{total.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-gray-500 text-sm">Completed</span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-gray-800">
            ₹{completed.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <FaClock className="text-yellow-500 text-2xl" />
            <span className="text-gray-500 text-sm">Pending</span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-gray-800">
            ₹{pending.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-red-500">
          <div className="flex items-center justify-between">
            <FaTimesCircle className="text-red-500 text-2xl" />
            <span className="text-gray-500 text-sm">Failed</span>
          </div>
          <h2 className="text-2xl font-bold mt-2 text-gray-800">
            ₹{failed.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        <div className="flex items-center gap-3">
          <FaFilter className="text-gray-500" />
          <select
            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6">Customer</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Method</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 font-medium text-gray-800">{p.customer}</td>
                <td className="py-3 px-6 text-gray-700 flex items-center gap-1">
                  <FaRupeeSign size={14} /> {p.amount.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-gray-600">{p.date}</td>
                <td className="py-3 px-6 text-gray-700">{p.method}</td>
                <td
                  className={`py-3 px-6 font-semibold ${
                    p.status === "Completed"
                      ? "text-green-600"
                      : p.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD PAYMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={24} />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add New Payment
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={newPayment.customer}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, customer: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={newPayment.amount}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, amount: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="date"
                value={newPayment.date}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, date: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <select
                value={newPayment.method}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, method: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select Payment Method</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
              </select>

              <button
                onClick={handleAddPayment}
                className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition-all"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
