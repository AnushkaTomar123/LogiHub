"use client"


const RecentShipment=()=>{
    const MOCK_SHIPMENTS = [
    { id: 1, label: "Shipping id S112233" },
    { id: 2, label: "Shipping id S123456" },
    { id: 3, label: "Shipping id S134567" },
  ];

    return(
        <>
         <div className=" p-4 rounded-xl bg-white  dark:bg-card  shadow-lg mb-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-semibold text-gray-700  dark:text-gray-200">
                  Recent Shipments
                </h3>
              </div>

              <div className="space-y-3">
                {MOCK_SHIPMENTS.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-background  text-sm text-gray-500 dark:text-gray-300"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
               </div>
        </>
    )
}
export default RecentShipment;