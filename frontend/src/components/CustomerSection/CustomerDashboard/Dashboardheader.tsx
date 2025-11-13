"use client";

import { useEffect, useState } from "react";

export default function DashboardHeader() {
 const [userName, setUsername] = useState("Customer");
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  useEffect(() => {
      if (typeof window === "undefined") return;
      const storedName = localStorage.getItem("username");
      if (storedName) setUsername(storedName);
}, []);

  return (
    <div className="flex justify-between items-center mb-6 p-2 bg-white dark:bg-background">
      <div className="bg-gray-100 dark:bg-card text-gray-800 dark:text-gray-50  px-4 py-2 rounded-md font-semibold">
        Welcome Back {userName}!!
      </div>
      <div className="bg-gray-100 dark:bg-card text-gray-800 dark:text-gray-50   px-4 py-2 rounded-md text-sm">
        {today}
      </div>
    </div>
  );
}
