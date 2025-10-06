"use client";

import { useState } from "react";
import UserTable from "../../../components/admin/UserTable";
import UserModal from "../../../components/admin/UserModal";
import { MdPersonAdd } from "react-icons/md";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Customer" | "Transporter";
  status: "Active" | "Inactive";
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Transporter", status: "Active" },
    { id: 3, name: "Admin One", email: "admin@example.com", role: "Admin", status: "Inactive" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

  const handleSave = (user: User) => {
    if (user.id) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      const newUser: User = { ...user, id: Date.now() };
      setUsers([...users, newUser]);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => { setEditingUser(undefined); setModalVisible(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <MdPersonAdd size={20} /> Add User
        </button>
      </div>

      <UserTable users={users} onEdit={(user) => { setEditingUser(user); setModalVisible(true); }} onDelete={handleDelete} />

      <UserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        user={editingUser}
      />
    </div>
  );
}
