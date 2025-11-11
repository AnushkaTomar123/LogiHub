"use client";

import ShipmentTracking from "@/components/CustomerSection/ShipmentTracking/ShipmentTracking";

export default function ShipmentTrackingPage() {
  return (
    <div className="flex flex-1 flex-col md:flex-row bg-[#0f0f10] text-white min-h-screen transition-all duration-300">
     
      <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
        <ShipmentTracking />
      </main>
    </div>
  );
}
