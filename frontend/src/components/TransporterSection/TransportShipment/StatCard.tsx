import React from "react";

export default function StatCard({ title, value, icon: Icon }: { title: string; value: number | string; icon: React.ElementType }) {
  return (
    <div className="p-4 rounded-xl shadow-md bg-gray-100 dark:bg-card text-gray-700 dark:text-white flex flex-col justify-between h-20">
      <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
