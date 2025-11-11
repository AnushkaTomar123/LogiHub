"use client";

import OrderTable from "@/components/CustomerSection/CustomerDashboard/OrderTable";
import DashboardHeader from "@/components/CustomerSection/CustomerDashboard/Dashboardheader";
import InfoCards from "@/components/CustomerSection/CustomerDashboard/InfoCards";
import TopTransporters from "@/components/CustomerSection/CustomerDashboard/TopTransporters";
import CustomerHeader from "@/components/CustomerSection/Customerheader";
import { useEffect, useState } from "react";


export default function CustomerDashboard() {
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
    <div  style={{ marginLeft: sidebarWidth, transition: "margin-left 300ms ease" }} className="min-h-screen bg-[#0f0f10] text-white p-0 m-0">
      <CustomerHeader/>
      <DashboardHeader />
      <InfoCards />
      <OrderTable />
      <TopTransporters />
    </div>
  );
}
