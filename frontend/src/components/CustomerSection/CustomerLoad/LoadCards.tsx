"use client";

import { IconType } from "react-icons"; // 👈 for icon prop
import { motion } from "framer-motion";

interface LoadCardProps {
  title: string;
  count: number;
  icon: IconType; // 👈 pass the icon (like MdLocalShipping)
  colorClass?: string; // optional background color class
}

export default function LoadCard({ title, count, icon: Icon, colorClass }: LoadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex justify-between items-center p-5 rounded-2xl shadow-lg 
      ${colorClass || "bg-white dark:bg-card"} text-gray-700 dark:text-gray-100`}
    >
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-xl font-bold">{count}</p>
      </div>

      <div className="p-3 bg-violet-300 rounded-full">
        <Icon className="text-violet-700 text-2xl" />
      </div>
    </motion.div>
  );
}
