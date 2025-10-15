"use client";

import TransporterSidebar from "@/components/transporter/TransporterSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
     <TransporterSidebar/>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}