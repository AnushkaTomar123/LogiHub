"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineLocalShipping,
  MdBarChart,
  MdOutlineArchive,
  MdPeople,
  MdRoute,
  MdFlashOn,
  MdCurrencyRupee,
  MdSettings,
  MdLogout,
  MdNavigation,
  MdTrendingUp,
  MdPeopleAlt,
  MdChat,
  MdHistory,
  MdRequestPage,
} from "react-icons/md";


interface SidebarItem {
  href?: string;
  label: string;
  icon: any;
  subItems?: { href: string; label: string; icon: any }[];
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export default function TransporterSidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const sections: SidebarSection[] = [
    {
      title: "MAIN MENU",
      items: [
        { href: "/transporter/dashboard", label: "Dashboard", icon: MdBarChart },
        { href: "/transporter/fleet", label: "Fleet Tracking", icon: MdNavigation },
        { href: "/transporter/trips", label: "Assigned Trips", icon: MdOutlineArchive },
        { href: "/transporter/drivers", label: "Driver Management", icon: MdPeople },
        { href: "/transporter/routes", label: "Route Planning", icon: MdRoute },
        {
          label: "Customer Management",
          icon: MdPeopleAlt,
          subItems: [
            { href: "/transporter/custmgmnt/cus-req", label: "Customer Requests", icon: MdRequestPage },
            { href: "/transporter/custmgmnt/cus-chat", label: "Customer Chats", icon: MdChat },
            { href: "/transporter/custmgmnt/cus-feedback", label: "Feedback / History", icon: MdHistory },
          ],
        },
      ],
    },
    {
      title: "AI & FINANCE",
      items: [
        { href: "/transporter/insights", label: "AI Insights", icon: MdFlashOn },
        {
          label: "Payments",
          icon: MdCurrencyRupee,
          subItems: [
            { href: "/transporter/payments/overview", label: "Overview", icon: MdBarChart },
            { href: "/transporter/payments/earnings", label: "Earning Report", icon: MdTrendingUp },
            { href: "/transporter/payments/history", label: "Payment History", icon: MdHistory },
            { href: "/transporter/payments/pending", label: "Pending Payments", icon: MdRequestPage },
          ],
        },
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

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-lg flex flex-col overflow-y-auto scrollbar-hide">
      {/* Header Logo */}
      <div className="p-6 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
          <MdOutlineLocalShipping size={22} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">LogiHub</h1>
          <p className="text-sm text-gray-500">Transporter Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((item) =>
                item.subItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 whitespace-nowrap transition-all duration-200"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-6 mt-2 space-y-1 flex flex-col">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                              pathname === sub.href ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <sub.icon size={16} className="text-gray-500 flex-shrink-0" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 font-medium ${
                      pathname === item.href ? "bg-blue-600 text-white shadow-sm" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
