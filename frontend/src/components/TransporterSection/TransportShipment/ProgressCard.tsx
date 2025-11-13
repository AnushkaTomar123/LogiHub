import React from "react";
import { MdRoute, MdPerson, MdLocalShipping } from "react-icons/md";

export default function ProgressCard({ status, isRunning }: { status: string; isRunning: boolean }) {
  return (
    <div className={`p-4 rounded-xl border-l-4 ${isRunning ? 'border-violet-600' : 'border-green-600'} bg-gray-100 dark:bg-card shadow-lg text-gray-700 dark:text-white mb-4`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">MP08HAI1122</span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isRunning ? 'bg-orange-600' : 'bg-green-600'}`}>
          {isRunning ? 'On Progress' : 'Delivered'}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <div className="flex flex-col">
          <p className="font-semibold">Indore</p>
          <span className="text-xs text-gray-500 dark:text-gray-300">10/11/22</span>
        </div>
        <div className="flex flex-col items-center text-gray-500 dark:text-gray-300 text-xs">
          <MdRoute size={20} />
          <span>Dist: 800km</span>
        </div>
        <div className="flex flex-col text-right">
          <p className="font-semibold">Mumbai</p>
          <span className="text-xs text-gray-500 dark:text-gray-300">14/11/22</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-200 dark:border-zinc-600 text-xs text-gray-500 dark:text-gray-300">
        <MdPerson size={16} /> Riya Tomar
        <MdLocalShipping size={16} className="ml-auto" />
      </div>
    </div>
  );
}
