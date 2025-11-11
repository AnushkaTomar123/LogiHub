"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  MdDashboard,
  MdPeople,
  MdAssignmentInd,
  MdAnalytics,
  MdSettings,
  MdOutlineLocalShipping,
  MdLightMode,
  MdDarkMode,
  MdLogout,
  MdMenu,
  MdClose,
  MdFeedback,
} from "react-icons/md";

interface Admin {
  username: string;
  email: string;
  role: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarCollapsed") === "true";
    }
    return false;
  });
  const [admin, setAdmin] = useState<Admin | null>(null);
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

  useEffect(() => {
    const username = localStorage.getItem("username") || "Admin";
    const email = localStorage.getItem("email") || "admin@logihub.com";
    const role = localStorage.getItem("role") || "SUPER_ADMIN";
    setAdmin({ username, email, role });
  }, []);



  const sections = [
    {
      title: "Main Menu",
      items: [
        { href: "/admin/dashboard", label: "Dashboard", icon: MdDashboard },
        { href: "/admin/users", label: "User Management", icon: MdPeople },
        {
          href: "/admin/roles",
          label: "Roles & Permissions",
          icon: MdAssignmentInd,
        },
        { href: "/admin/analytics", label: "Analytics", icon: MdAnalytics },
      ],
    },
    {
      title: "General",
      items: [
        { href: "/admin/feedback", label: "Feedback", icon: MdFeedback },
        
      ],
    },
    {
      title: "System",
      items: [
        { href: "/admin/settings", label: "Settings", icon: MdSettings },
        {
          label: "Theme",
          icon: theme === "dark" ? MdLightMode : MdDarkMode,
          isThemeToggle: true,
        },
      ],
    },
  ];

  const handleCollapseToggle = () => {
    if (window.innerWidth > 768) setCollapsed((s) => !s);
  };

  return (
    <aside
      className={`fixed top-0 left-0 p-0 h-screen flex flex-col justify-between transition-all duration-300 z-50 
      ${collapsed ? "w-20" : "w-64"}
      bg-white dark:bg-background border-r border-gray-200 dark:border-zinc-700 shadow-xl`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-600 text-white">
            <MdOutlineLocalShipping size={18} />
          </div>
          {!collapsed && (
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-50 text-lg tracking-wide">
                LogiHub
              </span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>

        <button
          onClick={handleCollapseToggle}
          className="hidden md:inline-flex text-gray-700 dark:text-white/80 hover:text-purple-600 dark:hover:text-gray-200 transition-all"
        >
          {collapsed ? <MdMenu size={22} /> : <MdClose size={22} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 pt-5 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {!collapsed && (
              <h4 className="text-xs uppercase font-semibold mb-3 tracking-wider text-violet-800 dark:text-gray-200 ">
                {section.title}
              </h4>
            )}

            <div className="space-y-1">
              {section.items
                .filter((item) => {
                  if (!admin) return false;

                  if (admin.role === "SUPER_ADMIN") return true;
                  if (
                    admin.role === "ADMIN" &&
                    item.href === "/admin/roles"
                  ) {
                    return false;
                  }
                  return true;
                })
                .map((item) =>
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
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
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

      {}
      <div className="px-4 py-4 border-t border-gray-300 dark:border-white/10 flex items-center gap-3">
        
            <Link
              href="/auth/login"
              className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
            >
              <MdLogout size={16} /> Logout
            </Link>
          </div>
       
    </aside>
  );
}
