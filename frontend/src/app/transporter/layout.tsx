"use client";

import { useEffect, useState } from "react";
import TransporterSidebar from "../../components/TransporterSection/TransporterSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("sidebarCollapsed") === "true";
        }
        return false;
      });
    
      useEffect(() => {
        const updateSidebar = () => {
          setSidebarCollapsed(localStorage.getItem("sidebarCollapsed") === "true");
        };
        window.addEventListener("storage", updateSidebar);
        return () => window.removeEventListener("storage", updateSidebar);
      }, []);
      const sidebarWidth = sidebarCollapsed ? 80 : 256;
  return (
    <div style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="flex min-h-screen p-0 m-0 bg-white dark:bg-background">
     <TransporterSidebar/>
      <main className="flex-1 p-0 m-0">{children}</main>
    </div>
  );
}