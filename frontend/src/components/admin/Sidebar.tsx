"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineLocalShipping,
  MdDashboard,
  MdPeople,
  MdAssignmentInd,
  MdAnalytics,
  MdSettings,
  MdSecurity,
  MdLogout,
} from "react-icons/md";
import { useEffect, useState } from "react";

interface Admin {
  username: string;
  email: string;
  role: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) {
      setAdmin({ username, email, role });
    }
  }, []);

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard },
    { href: "/admin/users", label: "User Management", icon: MdPeople },
    { href: "/admin/roles", label: "Roles & Permissions", icon: MdAssignmentInd },
    { href: "/admin/analytics", label: "Analytics", icon: MdAnalytics },
    { href: "/admin/settings", label: "Settings", icon: MdSettings },
    { href: "/admin/security", label: "Security", icon: MdSecurity },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
            <MdOutlineLocalShipping size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">LogiHub</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Admin Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 rounded-lg p-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {admin ? admin.username.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {admin ? admin.username : "Admin"}
            </p>
            <p className="text-sm text-gray-500">
              {admin ? admin.email : "admin@logihub.com"}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/auth/login";
          }}
          className="flex items-center text-sm text-red-500 hover:text-red-600 px-2 mt-2"
        >
          <MdLogout className="mr-1" /> Logout
        </button>
      </div>
    </aside>
  );
}
