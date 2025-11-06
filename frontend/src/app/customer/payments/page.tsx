"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaWallet, FaPlusCircle, FaClock } from "react-icons/fa";

const BASE_URL = "http://localhost:8080/api/wallets";
const OWNER_TYPE = "CUSTOMER";

export default function CustomerWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const customerId = localStorage.getItem("customerId");

  // 🔹 Fetch wallet on load
  useEffect(() => {
    if (customerId) fetchWallet();
  }, [customerId]);

  // 🔸 Get wallet details
  const fetchWallet = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${OWNER_TYPE}/${customerId}`);
      setWallet(res.data);
      fetchTransactions();
    } catch (err: any) {
      if (err.response?.status === 404) {
        await createWallet();
      } else {
        toast.error("Could not fetch wallet.");
      }
    }
  };

  // 🔸 Create wallet if not exists
  const createWallet = async () => {
    try {
      await axios.post(`${BASE_URL}/create`, {
        ownerId: Number(customerId),
        ownerType: OWNER_TYPE,
      });
      toast.success("Wallet created!");
      fetchWallet();
    } catch {
      toast.error("Failed to create wallet!");
    }
  };

  // 🔸 Fetch transaction history
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/transactions/${OWNER_TYPE}/${customerId}`);
      setTransactions(res.data);
    } catch {
      toast.error("Failed to fetch transactions.");
    }
  };

  // 🔸 Add money
  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/add-money`, {
        ownerId: Number(customerId),
        ownerType: OWNER_TYPE,
        amount: Number(amount),
        description: "Wallet top-up",
      });
      toast.success("Money added!");
      setWallet(res.data);
      setAmount("");
      fetchTransactions();
    } catch {
      toast.error("Failed to add money!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-3">
          <FaWallet size={28} className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Customer Wallet</h1>
        </div>

        {/* Wallet Info */}
        {wallet ? (
          <div className="text-center bg-blue-50 py-5 rounded-xl mb-6">
            <h2 className="text-gray-600 font-medium">Current Balance</h2>
            <p className="text-4xl font-bold text-blue-700 mt-1">
              ₹ {wallet.balance.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Updated on {new Date(wallet.lastUpdated).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500 mb-6">
            Loading wallet details...
          </div>
        )}

        {/* Add Money Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FaPlusCircle className="text-green-600" />
            <h3 className="font-semibold text-gray-700">Add Money</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleAddMoney}
              disabled={loading}
              className={`w-full sm:w-auto px-6 py-2 text-white font-semibold rounded-lg transition ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Add"}
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaClock className="text-blue-600" />
            <h3 className="font-semibold text-gray-700">Transaction History</h3>
          </div>

          {transactions.length > 0 ? (
            <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 sticky top-0">
                  <tr>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <span
                          className={`font-semibold ${
                            tx.transactionType === "CREDIT"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.transactionType}
                        </span>
                      </td>
                      <td className="px-4 py-2">₹ {tx.amount.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        {new Date(tx.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
