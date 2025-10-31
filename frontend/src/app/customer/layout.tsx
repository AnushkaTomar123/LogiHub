"use client";
import { Toaster } from "react-hot-toast";
import CustomerSidebar from "@/components/customer/CustomerSideBar";

//import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex min-h-screen">
         <CustomerSidebar/>
          <main className="ml-64 flex-1 p-2">{children}</main>
            <Toaster position="top-right" />
        </div>
  );
}