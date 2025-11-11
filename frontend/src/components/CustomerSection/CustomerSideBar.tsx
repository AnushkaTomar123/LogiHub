"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineLocalShipping,
  MdBarChart,
  MdCurrencyRupee,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { FaClipboardList, FaFileInvoice, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function CustomerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setCollapsed(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleCollapseToggle = () => {
    if (window.innerWidth > 768) setCollapsed((s) => !s);
  };

  const sections = [
    {
      title: "Main Menu",
      items: [
        { href: "/customer/dashboard", label: "Dashboard", icon: MdBarChart },
        { href: "/customer/load", label: "LoadPosting", icon: FaTruck },
        { href: "/customer/myorders", label: "My Orders", icon: FaClipboardList },
        { href: "/customer/billing", label: "Find Transporter", icon: FaFileInvoice },
      ],
    },
    {
      title: "Shipment & Payments",
      items: [
        { href: "/customer/shipment", label: "Shipment Track", icon: FaMapMarkerAlt },
        { href: "/customer/payments", label: "Payments", icon: MdCurrencyRupee },
      ],
    },
    {
      title: "System",
      items: [
        { href: "/customer/settings", label: "Settings", icon: MdSettings },
        { label: "Theme", icon: theme === "dark" ? MdLightMode : MdDarkMode, isThemeToggle: true },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen flex flex-col justify-between transition-all duration-300 z-50 
      ${collapsed ? "w-20" : "w-64"}
      bg-white dark:bg-background border-r border-gray-200 dark:border-zinc-700
      shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-violet-700">
            <MdOutlineLocalShipping size={18} />
          </div>
          {!collapsed && (
            <span className="font-semibold text-black dark:text-gray-50 text-lg tracking-wide">
              LogiHub
            </span>
          )}
        </div>

        <button
          onClick={handleCollapseToggle}
          className="hidden md:inline-flex text-gray-700 dark:text-gray-200 hover:text-violet-500 transition-all"
        >
          {collapsed ? <MdMenu size={22} /> : <MdClose size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 pt-5 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {!collapsed && (
              <h4 className="text-xs uppercase font-semibold mb-3 tracking-wider text-violet-800 dark:text-gray-300">
                {section.title}
              </h4>
            )}
            <div className="space-y-1">
              {section.items.map((item) =>
                item.isThemeToggle ? (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-card transition-all duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="text-gray-700 dark:text-gray-200 text-xl" />
                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                      )}
                    </div>
                    {!collapsed && (
                      <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="w-12 h-6 flex items-center rounded-full bg-gray-300 dark:bg-cardBg transition-all relative border border-gray-300 dark:border-gray-400"
                      >
                        <span
                          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300
                          ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                        ></span>
                      </button>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                    ${
                      pathname === item.href
                        ? " bg-violet-400 dark:bg-gradient-to-r dark:from-[#682EC7] dark:via-[#5827A8] dark:to-[#49208C] text-white"
                        : "hover:bg-gray-200 text-gray-700 dark:text-gray-200 dark:hover:bg-card"
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

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10 flex flex-col gap-1">
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-all duration-200 text-gray-700 dark:text-gray-200"
        >
          <MdLogout size={18} />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </Link>
      </div>
    </aside>
  );
}
