"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserPlus,
  FaSearch,
  FaTrashAlt,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

// ========================= Interfaces =========================
interface User {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Customer" | "Transporter";
  status: "Active" | "Inactive";
}

// ========================= Confirmation Modal =========================
function ConfirmationModal({
  message,
  onConfirm,
  onClose,
}: {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-sm"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Confirm Action
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ========================= User Modal =========================
function UserModal({
  onClose,
  onSave,
  user,
}: {
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}) {
  const [formData, setFormData] = useState<User>(
    user || {
      id: 0,
      name: "",
      email: "",
      role: "Customer",
      status: "Active",
    }
  );

  const [errors, setErrors] = useState({ name: "", email: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = (): boolean => {
    const tempErrors = { name: "", email: "" };
    let isValid = true;
    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      /\S+@\S+\.\S+/.test(formData.email.trim())
    );
  }, [formData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6">
          {user ? "Edit User" : "Add New User"}
        </h2>
        <div className="space-y-4">
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full border px-3 py-2 rounded-lg focus:ring-2 transition-colors ${
                errors.name
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full border px-3 py-2 rounded-lg focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 ring-red-200"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Transporter">Transporter</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`px-4 py-2 text-white rounded-lg transition-colors shadow-md ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed opacity-70"
            }`}
          >
            {user ? "Update User" : "Save User"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ========================= MAIN COMPONENT =========================
export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Transporter", status: "Active" },
    { id: 3, name: "Admin One", email: "admin@example.com", role: "Admin", status: "Inactive" },
  ]);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  // 🧩 get current role
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  useEffect(() => {
    setCurrentRole(localStorage.getItem("role"));
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
      )
      .filter((u) => (filterRole === "All" ? true : u.role === filterRole))
      .sort((a, b) =>
        a[sortBy as keyof User] > b[sortBy as keyof User] ? 1 : -1
      );
  }, [users, search, filterRole, sortBy]);

  const handleSave = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = useCallback(
    (id: number) => {
      setConfirmMessage(
        `Are you sure you want to delete user with ID ${id}?`
      );
      setConfirmAction(() => () => {
        setUsers(users.filter((u) => u.id !== id));
        setIsConfirmOpen(false);
      });
      setIsConfirmOpen(true);
    },
    [users]
  );

  const toggleStatus = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-extrabold text-gray-900">
            👥 User Management
          </h1>

          {/* Add User only if Admin or Super Admin */}
          {(currentRole === "Super Admin" || currentRole === "Admin") && (
            <button
              onClick={() => {
                setEditingUser(null);
                setModalOpen(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition-all"
            >
              <FaUserPlus size={22} /> Add New User
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 shadow-inner w-full sm:w-80">
            <FaSearch className="text-gray-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full bg-transparent text-gray-800"
            />
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
              <option value="Transporter">Transporter</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
              <option value="role">Sort by Role</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const isLimited =
                  currentRole === "Admin" &&
                  (user.role === "Admin" || user.role === "Super Admin");
                return (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-blue-50/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.email}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          user.role === "Admin"
                            ? "bg-red-100 text-red-700"
                            : user.role === "Customer"
                            ? "bg-green-100 text-green-700"
                            : user.role === "Transporter"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors shadow-sm ${
                          user.status === "Active"
                            ? "bg-green-200 text-green-800 hover:bg-green-300"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center space-x-3">
                      {!isLimited && (
                        <>
                          <button
                            onClick={() => {
                              setEditingUser(user);
                              setModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                            title="Edit"
                          >
                            <FaEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                            title="Delete"
                          >
                            <FaTrashAlt size={20} />
                          </button>
                        </>
                      )}
                      {isLimited && (
                        <span className="text-gray-400 text-sm italic">
                          Restricted
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 py-10 text-lg">
              No users found.
            </p>
          )}
        </div>

        {modalOpen && (
          <UserModal
            onClose={() => {
              setModalOpen(false);
              setEditingUser(null);
            }}
            onSave={handleSave}
            user={editingUser}
          />
        )}

        {isConfirmOpen && confirmAction && (
          <ConfirmationModal
            message={confirmMessage}
            onConfirm={confirmAction}
            onClose={() => setIsConfirmOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
