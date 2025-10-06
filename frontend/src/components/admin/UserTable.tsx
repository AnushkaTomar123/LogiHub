"use client";
import { MdEdit, MdDelete } from "react-icons/md";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Customer" | "Transporter";
  status: "Active" | "Inactive";
}

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Name", "Email", "Role", "Status", "Actions"].map((h) => (
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
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2 break-words">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
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
