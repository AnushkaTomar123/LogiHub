"use client";

import { MdEdit, MdDelete } from "react-icons/md";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: number) => void;
}

export default function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Role Name", "Description", "Permissions", "Actions"].map((h) => (
              <th
                key={h}
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-100 transition">
              <td className="px-4 py-2">{role.id}</td>
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2">{role.description}</td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((p) => (
                    <span
                      key={p}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit(role)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this role?")) onDelete(role.id);
                  }}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700"
                >
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
