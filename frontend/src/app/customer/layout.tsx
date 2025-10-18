"use client";

import CustomerSidebar from "@/components/customer/CustomerSideBar";

//import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex min-h-screen">
         <CustomerSidebar/>
          <main className="ml-64 flex-1 p-2">{children}</main>
        </div>
  );
}