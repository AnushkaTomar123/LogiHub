"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TransporterHeader from "@/components/transporter/TransporterHeader";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaFilter,
  FaWallet,
  FaExchangeAlt,
} from "react-icons/fa";

export default function Payments() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const BASE_URL = "http://localhost:8080/api/wallets";
  const OWNER_TYPE = "TRANSPORTER";
  const OWNER_ID = localStorage.getItem("transporterId");

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

  const sidebarWidth = sidebarCollapsed ? 80 : 256;

  const fetchWallet = async () => {
    try {
      const walletRes = await axios.get(`${BASE_URL}/${OWNER_TYPE}/${OWNER_ID}`);
      const txnRes = await axios.get(`${BASE_URL}/transactions/${OWNER_TYPE}/${OWNER_ID}`);
      setWallet(walletRes.data);
      setTransactions(txnRes.data);
    } catch (err) {
      console.error("Error fetching wallet:", err);
      toast.error("Failed to fetch wallet data");
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handleCreateWallet = async () => {
    if (wallet) return toast.error("Wallet already exists");
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/create`, {
        ownerId: OWNER_ID,
        ownerType: OWNER_TYPE,
      });
      setWallet(res.data);
      toast.success("Wallet created successfully!");
    } catch (err) {
      toast.error("Failed to create wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMoney = async () => {
    if (!amount) return toast.error("Enter amount");
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/add-money`, {
        ownerId: OWNER_ID,
        ownerType: OWNER_TYPE,
        amount: parseFloat(amount),
      });
      toast.success(`₹${amount} added successfully!`);
      setAmount("");
      fetchWallet();
    } catch {
      toast.error("Failed to add money");
    } finally {
      setLoading(false);
    }
  };

  const handleTransferMoney = async () => {
    if (!receiverId || !amount) return toast.error("Enter receiver ID and amount");
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/transfer`, {
        senderId: OWNER_ID,
        senderType: OWNER_TYPE,
        receiverId: parseInt(receiverId),
        receiverType: "CUSTOMER",
        amount: parseFloat(amount),
      });
      toast.success("Money transferred successfully!");
      setReceiverId("");
      setAmount("");
      fetchWallet();
    } catch {
      toast.error("Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments =
    filter === "All" ? transactions : transactions.filter((t) => t.status === filter);

  const total = transactions.reduce((sum, p) => sum + p.amount, 0);
  const completed = transactions.filter((p) => p.status === "Completed").reduce((s, p) => s + p.amount, 0);
  const pending = transactions.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const failed = transactions.filter((p) => p.status === "Failed").reduce((s, p) => s + p.amount, 0);

  return (
    <div
      style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-black text-gray-900 dark:text-gray-200 p-0"
    >
      <TransporterHeader />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-700 dark:text-blue-400">
          Payments & Wallet
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleCreateWallet}
            disabled={loading || wallet}
            className={`px-5 py-2 rounded-xl shadow-md font-semibold ${
              wallet
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {wallet ? "Wallet Created" : loading ? "Processing..." : "Create Wallet"}
          </button>
          <button
            onClick={fetchWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl shadow-md font-semibold"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Wallet Info */}
      {wallet && (
        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <FaWallet /> Wallet Details
              </h2>
              <p className="mt-2">Owner Type: <b>{wallet.ownerType}</b></p>
              <p>Owner ID: <b>{wallet.ownerId}</b></p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Available Balance</p>
              <h2 className="text-4xl font-bold text-green-600">
                ₹{wallet.balance?.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Money Actions */}
      <div className="flex flex-wrap gap-4 mb-10 items-center">
        <input
          type="number"
          placeholder="Enter Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-[#111] px-4 py-2 rounded-lg w-56"
        />
        <button
          onClick={handleAddMoney}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Add Money
        </button>

        <input
          type="number"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 dark:bg-[#111] px-4 py-2 rounded-lg w-52"
        />
        <button
          onClick={handleTransferMoney}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
        >
          <FaExchangeAlt /> Transfer
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Transactions", amount: total, color: "blue", icon: <FaCreditCard /> },
          { label: "Completed", amount: completed, color: "green", icon: <FaCheckCircle /> },
          { label: "Pending", amount: pending, color: "yellow", icon: <FaClock /> },
          { label: "Failed", amount: failed, color: "red", icon: <FaTimesCircle /> },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-[#111] p-5 rounded-2xl shadow-md border-t-4 border-${item.color}-500 hover:scale-[1.03] transition-transform`}
          >
            <div className="flex justify-between items-center">
              <span className={`text-${item.color}-500 text-2xl`}>{item.icon}</span>
              <span className="text-gray-500 text-sm">{item.label}</span>
            </div>
            <h2 className="text-2xl font-bold mt-2">₹{item.amount.toLocaleString()}</h2>
          </div>
        ))}
      </div>

      {/* Transactions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 dark:bg-[#111] rounded-lg px-3 py-1"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white dark:bg-[#111] shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 mb-10">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="py-3 px-6">Txn ID</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((p: any) => (
                <tr
                  key={p.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-6 font-medium">{p.id}</td>
                  <td className="py-3 px-6 flex items-center gap-1">
                    <FaRupeeSign size={14} /> {p.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-6">{p.date}</td>
                  <td className="py-3 px-6">{p.type}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      p.status === "Completed"
                        ? "text-green-500"
                        : p.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {p.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
