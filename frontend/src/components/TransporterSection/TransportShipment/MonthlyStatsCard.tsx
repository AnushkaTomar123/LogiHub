import React from "react";

export default function MonthlyStatsCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-background shadow-md">
      <span className="text-sm text-gray-500 dark:text-gray-300">{title}</span>
      <span className="text-lg font-bold text-violet-400">{value}</span>
    </div>
  );
}
