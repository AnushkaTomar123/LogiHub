"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TransporterHeader from "../../../components/TransporterSection/TransporterHeader";
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
  FaWallet,
} from "react-icons/fa";

export default function Payments() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  //const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const BASE_URL = "http://localhost:8080/api/wallets";
  const OWNER_TYPE = "TRANSPORTER";
  const OWNER_ID = localStorage.getItem("transporterId");

  

  // ✅ Fetch wallet first, then get transactions by walletId
  const fetchWallet = async () => {
    try {
      const walletRes = await axios.get(`${BASE_URL}/${OWNER_TYPE}/${OWNER_ID}`);
      setWallet(walletRes.data);
      await fetchTransactions(walletRes.data.id); // use walletId
    } catch (err) {
      console.error("Error fetching wallet:", err);
      toast.error("Failed to fetch wallet data");
    }
  };

  // ✅ Fetch transactions by walletId
  const fetchTransactions = async (walletId: number) => {
    try {
      const txnRes = await axios.get(`${BASE_URL}/transactions/${walletId}`);
      setTransactions(txnRes.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      toast.error("Failed to fetch transactions");
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
    if (!receiverId || !amount)
      return toast.error("Enter receiver ID and amount");
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
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  const total = transactions.reduce((sum, p) => sum + p.amount, 0);
  const completed = transactions
    .filter((p) => p.status === "Completed")
    .reduce((s, p) => s + p.amount, 0);
  const pending = transactions
    .filter((p) => p.status === "Pending")
    .reduce((s, p) => s + p.amount, 0);
  const failed = transactions
    .filter((p) => p.status === "Failed")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div
     
      className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-gray-200 p-0"
    >
      <TransporterHeader />

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 gap-4">
        <h1 className="text-3xl font-medium text-violet-700 dark:text-violet-400">
          Payments & Wallet
        </h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCreateWallet}
            disabled={loading || wallet}
            className={`px-5 py-2 rounded-xl shadow-md font-semibold ${
              wallet
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {wallet
              ? "Wallet Created"
              : loading
              ? "Processing..."
              : "Create Wallet"}
          </button>
          <button
            onClick={fetchWallet}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl shadow-md font-semibold"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 mb-6">
        {[
          {
            label: "Total Transactions",
            amount: total,
            color: "violet",
            icon: <FaCreditCard />,
          },
          {
            label: "SELF_ADD",
            amount: completed,
            color: "violet",
            icon: <FaCheckCircle />,
          },
          {
            label: "TRANSFER_IN",
            amount: pending,
            color: "yellow",
            icon: <FaClock />,
          },
          {
            label: "TRANSFER_OUT",
            amount: failed,
            color: "red",
            icon: <FaTimesCircle />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-card p-5 rounded-2xl shadow-md hover:scale-[1.03] transition-transform`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-${item.color}-500 text-2xl`}>
                {item.icon}
              </span>
              <span className="text-gray-500 text-sm">{item.label}</span>
            </div>
            <h2 className="text-2xl font-bold">
              ₹{item.amount.toLocaleString()}
            </h2>
          </div>
        ))}
      </div>

      {/* Wallet & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 p-4">
        {wallet && (
          <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-violet-600 dark:text-violet-400">
              <FaWallet /> Wallet Details
            </h2>
            <p className="mt-3">
              Owner Type: <b>{wallet.ownerType}</b>
            </p>
          
            <p className="mt-2 text-2xl font-bold text-violet-600">
              Balance: ₹{wallet.balance?.toLocaleString()}
            </p>
          </div>
        )}

        {/* Add / Transfer Money */}
        <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 m-4">
          <h2 className="text-xl font-semibold mb-4 text-violet-600 dark:text-violet-400">
            Add 
          </h2>
          <div className="flex flex-col gap-3">
            <label htmlFor="amt">Enter Your Amount :</label>
            <input
              type="number"
              placeholder="Enter Amount (₹)"
              value={amount}
              id="amt"
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 dark:bg-card px-4 py-2 rounded-lg w-full"
            />
            <button
              onClick={handleAddMoney}
              className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg w-full"
            >
              Add Money
            </button>
          
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto bg-white dark:bg-card shadow-lg rounded-2xl border border-gray-200 p-6 dark:border-gray-700 mb-10">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 dark:bg-card rounded-lg px-3 py-1"
          >
            <option>All</option>
            <option>SELF_ADD</option>
            <option>TRANSFER_IN</option>
            <option>TRANSFER_OUT</option>
          </select>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <tr>
              <th className="py-3 px-6">Txn ID</th>
              <th className="py-3 px-6">Amount</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Description</th>
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
                  <td className="py-3 px-6">
                    {new Date(p.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">{p.transactionType}</td>
                  <td className="py-3 px-6">{p.description}</td>
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
