"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminHeader from "@/components/AdminSection/AdminHeader";
import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

type UserRole = "ADMIN" | "CUSTOMER" | "TRANSPORTER";

interface UserProfile {
  userId: number;
  username: string;
  email: string;
  role: UserRole;
  profilePhotoUrl?: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/profile/all")
      .then((res) => setUsers(res.data || []))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/profile/${userId}`);
      toast.success("User deleted successfully!");
      setUsers(users.filter((u) => u.userId !== userId)); // Update UI
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user!");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-all duration-300">
      <AdminHeader />

      {/* Header with Search */}
      <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-background shadow-md rounded-xl mt-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          👥 User Management
        </h1>

        <div className="flex items-center bg-gray-100 dark:bg-background rounded-lg px-3 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-gray-800 dark:text-gray-200"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white dark:bg-card mt-6 mx-6 rounded-xl shadow-md">
        {loading ? (
          <p className="text-center py-10 text-gray-600 dark:text-gray-200">
            Loading users...
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center py-10 text-gray-600 dark:text-gray-200">
            No users found 😕
          </p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-background border-b">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <motion.tr
                  key={u.userId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-background transition-colors"
                >
                  <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                    {u.username}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {u.email}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "CUSTOMER"
                          ? "bg-green-100 text-green-700"
                          : u.role === "TRANSPORTER"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() =>
                        router.push(`/admin/user-profile/${u.userId}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <FaEye /> View
                    </button>

                    <button
                      onClick={() => handleDelete(u.userId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
