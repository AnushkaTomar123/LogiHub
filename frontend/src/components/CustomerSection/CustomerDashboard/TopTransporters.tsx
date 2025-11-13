"use client";

import { FaFaceGrinStars } from "react-icons/fa6";



const transporters = [
  { name: "Raj Logistic", location: "Delhi", rating: 4 },
  { name: "FastMove Cargo", location: "Mumbai", rating: 3 },
];

export default function TopTransporters() {
  return (
    <div className="bg-gray-100 dark:bg-card rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold">Top Transporters</p>
        <button className="bg-gray-100 dark:bg-violet-600 px-3 py-1 rounded text-sm">View More</button>
      </div>

      {transporters.map((t, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-gray-50 dark:bg-background rounded-lg p-3 mb-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-violet-600" />
            <div>
              <p className="font-medium">{t.name}</p>
              <div className="flex">
                {[...Array(5)].map((_, idx) => (
                  <FaFaceGrinStars
                    key={idx}
                    size={14}
                    className={idx < t.rating ? "text-yellow-400" : "text-gray-600"}
                    fill={idx < t.rating ? "yellow" : "none"}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-gray-400">{t.location}</p>
            <button className="text-violet-400 hover:underline">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  );
}
