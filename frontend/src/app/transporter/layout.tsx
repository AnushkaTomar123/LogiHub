"use client";

import TransporterSidebar from "../../components/TransporterSection/TransporterSidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen p-0 m-0 bg-white dark:bg-background">
     <TransporterSidebar/>
      <main className="flex-1 p-0 m-0">{children}</main>
    </div>
  );
}