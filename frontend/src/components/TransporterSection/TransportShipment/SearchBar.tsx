import React from "react";
import { MdSearch } from "react-icons/md";

export default function SearchBar({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Route..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-10 border border-gray-200 dark:border-zinc-600 rounded-xl bg-gray-100 dark:bg-card text-gray-700 dark:text-white focus:ring-violet-500 focus:border-violet-500"
      />
      <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
    </div>
  );
}
