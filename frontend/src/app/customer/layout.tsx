"use client";
import { Toaster } from "react-hot-toast";
import CustomerSidebar from "@/components/CustomerSection/CustomerSideBar";

//import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
     <div className="flex min-h-screen p-0 m-0">
         <CustomerSidebar/>
          <main className="flex-1 p-2">{children}</main>
            <Toaster position="top-right" />
        </div>
  );
}