"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineLocalShipping,
  MdBarChart,
  MdNavigation,
  MdOutlineArchive,
  MdPeople,
  MdRoute,
  MdFlashOn,
  MdCurrencyRupee,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { useEffect, useState } from "react";

interface Transporter {
  username: string;
  email: string;
  role: string;
}

export default function TransporterSidebar() {
  const pathname = usePathname();
  const [transporter, setTransporter] = useState<Transporter | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (username && email && role) {
      setTransporter({ username, email, role });
    }
  }, []);

  const sections = [
    {
      title: "MAIN MENU",
      items: [
        { href: "/transporter/dashboard", label: "Dashboard", icon: MdBarChart },
        { href: "/transporter/fleet", label: "Fleet Tracking", icon: MdNavigation },
        { href: "/transporter/trips", label: "Assigned Trips", icon: MdOutlineArchive },
        { href: "/transporter/drivers", label: "Driver Management", icon: MdPeople },
        { href: "/transporter/routes", label: "Route Planning", icon: MdRoute },
      ],
    },
    {
      title: "AI & FINANCE",
      items: [
        { href: "/transporter/insights", label: "AI Insights", icon: MdFlashOn },
        { href: "/transporter/payments", label: "Payments", icon: MdCurrencyRupee },
      ],
    },
    {
      title: "OTHERS",
      items: [
        { href: "/transporter/settings", label: "Settings", icon: MdSettings },
        { href: "/auth/login", label: "Log out", icon: MdLogout },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
            <MdOutlineLocalShipping size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">LogiHub</h1>
            <p className="text-sm text-gray-500">Transporter Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                {section.title}
              </h4>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition ${
                      pathname === item.href
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Transporter Info (bottom) */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 rounded-lg p-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {transporter ? transporter.username.charAt(0).toUpperCase() : "T"}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {transporter ? transporter.username : "Transporter"}
            </p>
            <p className="text-sm text-gray-500">
              {transporter ? transporter.email : "transporter@logihub.com"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
