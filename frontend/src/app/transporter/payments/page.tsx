"use client";

import TransporterHeader from "@/components/transporter/TransporterHeader";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

export default function Payments() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  // for add-money and transfer
  const [amount, setAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const BASE_URL = "http://localhost:8080/api/wallets";
const OWNER_TYPE = "TRANSPORTER";
const OWNER_ID = localStorage.getItem("transporterId");
 // TRANSPORTER / DRIVER as per your backend logic

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      const handleStorageChange = () => {
        setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  // 🧾 Fetch wallet info and transactions
  const fetchWallet = async () => {
    try {
      const walletRes = await axios.get(`${BASE_URL}/${OWNER_TYPE}/${OWNER_ID}`);
      const txnRes = await axios.get(`${BASE_URL}/transactions/${OWNER_TYPE}/${OWNER_ID}`);
      setWallet(walletRes.data);
      setTransactions(txnRes.data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  // 💳 Create wallet
  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/create`, {
        ownerId: OWNER_ID,
        ownerType: OWNER_TYPE,
      });
      alert("Wallet created successfully!");
      console.log(response.data);
      setWallet(response.data);
    } catch (error) {
      console.error("Error creating wallet:", error);
      alert("Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  // 💰 Add money
  const handleAddMoney = async () => {
    if (!amount) return alert("Please enter amount");
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/add-money`, {
        ownerId: OWNER_ID,
        ownerType: OWNER_TYPE,
        amount: parseFloat(amount),
      });
      alert("Money added successfully!");
      console.log(response.data);
      fetchWallet();
      setAmount("");
    } catch (error) {
      console.error("Error adding money:", error);
      alert("Failed to add money");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Transfer money
  const handleTransferMoney = async () => {
    if (!receiverId || !amount)
      return alert("Please fill receiver ID and amount");

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/transfer`, {
        senderId: OWNER_ID,
        senderType: OWNER_TYPE,
        receiverId: parseInt(receiverId),
        receiverType: "CUSTOMER", // you can change this
        amount: parseFloat(amount),
      });
      alert("Money transferred successfully!");
      console.log(response.data);
      fetchWallet();
      setReceiverId("");
      setAmount("");
    } catch (error) {
      console.error("Error transferring money:", error);
      alert("Failed to transfer money");
    } finally {
      setLoading(false);
    }
  };

  const total = transactions.reduce((sum, p) => sum + p.amount, 0);
  const completed = transactions
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pending = transactions
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const failed = transactions
    .filter((p) => p.status === "Failed")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments =
    filter === "All"
      ? transactions
      : transactions.filter((p) => p.status === filter);

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  return (
    <div
      style={{
        marginLeft: sidebarWidth,
        transition: "margin-left 300ms ease",
      }}
      className="bg-[#f9fafb] min-h-screen px-8 py-10 font-sans"
    >
      <TransporterHeader />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Payments & Wallet Management
        </h1>

        <div className="flex gap-3">
          <button
            onClick={handleCreateWallet}
            disabled={loading}
            className="dark:text-green-200 text-green-300 dark:bg-green-800 px-4 py-2 rounded-lg shadow-md"
          >
            {loading ? "Processing..." : "Add Wallet"}
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FaPlus /> Add Payment
          </button>
        </div>
      </div>

      {/* WALLET INFO */}
      {wallet && (
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Wallet Details
          </h2>
          <p className="text-gray-700">
            <strong>Owner Type:</strong> {wallet.ownerType}
          </p>
          <p className="text-gray-700">
            <strong>Owner ID:</strong> {wallet.ownerId}
          </p>
          <p className="text-gray-700">
            <strong>Balance:</strong> ₹{wallet.balance?.toLocaleString()}
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-8">
        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border text-gray-900 border-gray-300 rounded-lg px-3 py-2 w-48"
        />
        <button
          onClick={handleAddMoney}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Money
        </button>

        <input
          type="number"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-40"
        />
        <button
          onClick={handleTransferMoney}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          Transfer
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-5 rounded-2xl shadow-md border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <FaCreditCard className="text-blue-500 text-2xl" />
            <span className="text-gray-500 text-sm">Total Transactions</span>
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

      {/* FILTERS + TRANSACTIONS */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Transactions
        </h2>
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

      {/* TRANSACTIONS TABLE */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6">Transaction ID</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p: any) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 font-medium text-gray-800">
                  {p.id}
                </td>
                <td className="py-3 px-6 text-gray-700 flex items-center gap-1">
                  <FaRupeeSign size={14} /> {p.amount.toLocaleString()}
                </td>
                <td className="py-3 px-6 text-gray-600">{p.date}</td>
                <td className="py-3 px-6 text-gray-700">{p.type}</td>
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
    </div>
  );
}
