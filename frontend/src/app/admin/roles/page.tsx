"use client";

import { useState } from "react";
import RoleTable from "../../../components/admin/RoleTable";
import RoleModal from "../../../components/admin/RoleModal";
import { MdAdd } from "react-icons/md";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Admin", description: "Full access", permissions: ["Manage Roles", "View Users", "Edit Users"] },
    { id: 2, name: "Customer Manager", description: "Manage customers", permissions: ["View Users", "Edit Users"] },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined);

  const handleSave = (role: Role) => {
    if (role.id) {
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      setRoles([...roles, { ...role, id: Date.now() }]);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Roles & Permissions</h1>
        <button
          onClick={() => { setEditingRole(undefined); setModalVisible(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <MdAdd size={20} /> Add Role
        </button>
      </div>

      <RoleTable roles={roles} onEdit={(r) => { setEditingRole(r); setModalVisible(true); }} onDelete={handleDelete} />

      <RoleModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={handleSave} role={editingRole} />
    </div>
  );
}
