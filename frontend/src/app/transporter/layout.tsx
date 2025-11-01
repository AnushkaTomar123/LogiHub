"use client";

import TransporterSidebar from "@/components/transporter/TransporterSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
     <TransporterSidebar/>
      <main className="flex-1 ">{children}</main>
    </div>
  );
}