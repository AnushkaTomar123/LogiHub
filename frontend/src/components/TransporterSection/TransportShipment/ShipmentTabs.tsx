import React from "react";

export default function ShipmentTabs({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = ["All(1)", "Stopped(5)", "Running(6)"];

  return (
    <div className="flex justify-between bg-white dark:bg-background p-1 rounded-xl shadow-lg">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.split('(')[0])}
          className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${
            activeTab === tab.split('(')[0]
              ? 'bg-violet-600 text-white shadow-md'
              : 'text-gray-500 dark:text-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
