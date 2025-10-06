"use client";

import { useState, useEffect } from "react";
import PermissionCheckbox from "../admin/Permissioncheckbox";

interface Role {
  id?: number;
  name: string;
  description: string;
  permissions: string[];
}

interface RoleModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (role: Role) => void;
  role?: Role;
}

const ALL_PERMISSIONS = [
  "View Users",
  "Edit Users",
  "Delete Users",
  "View Orders",
  "Edit Orders",
  "Delete Orders",
  "Manage Roles",
  "View Analytics",
];

export default function RoleModal({ visible, onClose, onSave, role }: RoleModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (role) {
      setName(role.name);
      setDescription(role.description);
      setPermissions(role.permissions);
    } else {
      setName("");
      setDescription("");
      setPermissions([]);
    }
  }, [role]);

  if (!visible) return null;

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setPermissions([...permissions, permission]);
    } else {
      setPermissions(permissions.filter((p) => p !== permission));
    }
  };

  const handleSave = () => {
    if (!name) {
      alert("Please enter role name!");
      return;
    }
    onSave({ id: role?.id, name, description, permissions });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-orange-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Role Name"
            className="border px-4 py-2 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border px-4 py-2 rounded-lg w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-2">
            <h3 className="font-semibold mb-2">Permissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map((perm) => (
                <PermissionCheckbox
                  key={perm}
                  permission={perm}
                  checked={permissions.includes(perm)}
                  onChange={handlePermissionChange}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border hover:bg-gray-100">
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
