"use client";
import { useState, useEffect } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  role: "Admin" | "Customer" | "Transporter";
  status: "Active" | "Inactive";
}

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user?: User;
}

export default function UserModal({ visible, onClose, onSave, user }: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<User["role"]>("Customer");
  const [status, setStatus] = useState<User["status"]>("Active");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    } else {
      setName("");
      setEmail("");
      setRole("Customer");
      setStatus("Active");
    }
  }, [user]);

  if (!visible) return null;

  const handleSave = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !emailRegex.test(email)) {
      alert("Please enter valid Name and Email!");
      return;
    }
    onSave({ id: user?.id, name, email, role, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            className="border px-4 py-2 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border px-4 py-2 rounded-lg w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className="border px-4 py-2 rounded-lg w-full"
            value={role}
            onChange={(e) => setRole(e.target.value as User["role"])}
          >
            <option>Admin</option>
            <option>Customer</option>
            <option>Transporter</option>
          </select>
          <select
            className="border px-4 py-2 rounded-lg w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value as User["status"])}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
