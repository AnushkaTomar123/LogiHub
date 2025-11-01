"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  MdOutlineLocalShipping,
  MdBarChart,
  MdNavigation,
  MdPeople,
  MdFlashOn,
  MdCurrencyRupee,
  MdSettings,
  MdLogout,
  MdTrendingUp,
  MdPeopleAlt,
  MdHistory,
  MdRequestPage,
  MdMenu,
  MdClose,
} from "react-icons/md";

export default function TransporterSidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });
  const { theme, setTheme } = useTheme();

  // 🔹 Auto-collapse on mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Sync collapse state with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", collapsed ? "true" : "false");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "sidebarCollapsed",
          newValue: collapsed ? "true" : "false",
        })
      );
    }
  }, [collapsed]);

  const sections = [
    {
      title: "Main Menu",
      items: [
        { href: "/transporter/dashboard", label: "Dashboard", icon: MdBarChart },
        { href: "/transporter/fleet", label: "Fleet Management", icon: MdNavigation },
        { href: "/transporter/drivers", label: "Driver Management", icon: MdPeople },
        { href: "/transporter/routes", label: "Shipment Tracking", icon: MdOutlineLocalShipping },
        { href: "/transporter/customer", label: "Customer Management", icon: MdPeopleAlt },
      ],
    },
    {
      title: "Load & Billing",
      items: [
        { href: "/transporter/freights", label: "Freight Management", icon: MdFlashOn },
        {
          label: "Payment",
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
      title: "System",
      items: [{ href: "/transporter/settings", label: "Settings", icon: MdSettings }],
    },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // 🔹 Prevent expanding on mobile
  const handleCollapseToggle = () => {
    if (window.innerWidth > 768) {
      setCollapsed((s) => !s);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col justify-between transition-all duration-300 z-50 
      ${collapsed ? "w-20" : "w-64"}
      bg-[#8979FF] dark:bg-background border-r border-white dark:border-border
      text-white shadow-xl`}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-700">
            <MdOutlineLocalShipping size={18} />
          </div>
          {!collapsed && <span className="font-semibold text-lg tracking-wide">LogiHub</span>}
        </div>

        <button
          onClick={handleCollapseToggle} // 🔹 Modified here
          className="hidden md:inline-flex text-white/80 hover:text-white  transition-all"
        >
          {collapsed ? <MdMenu size={22} /> : <MdClose size={22} />}
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 pt-5 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {!collapsed && (
              <h4 className="text-xs uppercase font-semibold mb-3 tracking-wider text-white/70">
                {section.title}
              </h4>
            )}

            <div className="space-y-1">
              {section.items.map((item) =>
                item.subItems ? (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-all duration-200
                      hover:bg-white/10 ${openDropdown === item.label ? "bg-white/10" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon size={18} />
                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                      </div>
                      {!collapsed && (
                        <span className="text-xs">{openDropdown === item.label ? "−" : "+"}</span>
                      )}
                    </button>

                    {openDropdown === item.label && (
                      <div className="ml-6 mt-2 space-y-1 animate-fadeIn">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                            ${
                              pathname === sub.href
                                ? "bg-gradient-to-r from-[#682EC7] via-[#5827A8] to-[#49208C] text-white"
                                : "hover:bg-white/10"
                            }`}
                          >
                            <sub.icon size={15} />
                            {!collapsed && sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                    ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-[#682EC7] via-[#5827A8] to-[#49208C] text-white"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <item.icon size={18} />
                    {!collapsed && <span className="text-sm">{item.label}</span>}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-3">
        {!collapsed && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-12 h-6 flex items-center rounded-full bg-gray-400 dark:bg-gray-600 transition-all relative"
            >
              <span
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300
                ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
              ></span>
            </button>
          </div>
        )}

        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
        >
          <MdLogout size={18} />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </Link>
      </div>
    </aside>
  );
}
