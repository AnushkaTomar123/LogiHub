import React, { useState } from "react";
import AssignDriverModal from "./AssignDriverModal";
import { MdLocalShipping } from "react-icons/md";

export default function BookingCard({
  booking,
  onView,
  onAccept,
}: {
  booking: any;
  onView: (b: any) => void;
  onAccept: (id: number) => void;
}) {
  const status = booking.status?.toUpperCase();
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleAssignClick = () => setShowAssignModal(true);
  const handleCloseModal = () => setShowAssignModal(false);

  return (
    <>
      <div className="w-[400px] bg-card border dark:border-card dark:hover:border-[#682EC7] rounded-xl p-2 shadow-lg text-gray-300 transition-transform hover:scale-[1.02] hover:shadow-purple-500/30">
        {/* Load ID */}
        <p className="text-sm mb-2 text-gray-200">
          <span className="font-semibold text-gray-600 dark:text-gray-200">Load Id:</span>{" "}LOGI123
          {booking.id || "N/A"}
        </p>

        {/* Pickup and Drop */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-200 font-medium">{booking.pickupAddress}</span>
          <div className="flex-1 mx-2 border-t border-gray-500 relative">
          
            < MdLocalShipping className="text-violet-400 dark:text-violet-300 dark:hover:text-violet-50 absolute left-1/2 -top-5 transform -translate-x-1/2 w-8 h-6"/>
                             
          </div>
          <span className="text-gray-600 dark:text-gray-200 font-medium">{booking.dropAddress}</span>
        </div>

        {/* Details */}
        <div className="text-sm space-y-1">
          <p>
            <span className="text-gray-400">Commodity Type :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">{booking.goodsDescription}</span>
          </p>
          <p>
            <span className="text-gray-400">Vehicle Type :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">{booking.vehicalType}</span>
          </p>
          <p>
            <span className="text-gray-400">Weight/Capacity :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">
              {booking.capacity || "N/A"}
            </span>
          </p>
          <p>
            <span className="text-gray-400">Pickup Date :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">{booking.pickupDate || "N/A"}</span>
          </p>
          <p>
            <span className="text-gray-400">Expected Delivery :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">{booking.expectDelieveryDate || "N/A"}</span>
          </p>
          <p>
            <span className="text-gray-400">Rate :</span>{" "}
            <span className="text-gray-600 dark:text-gray-200">₹{booking.estimatedCost}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-between gap-3">
          {status === "PENDING" && (
            <>
              <button
                onClick={() => onAccept(booking.id)}
                className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
              >
                Accept Load
              </button>
              <button
                onClick={() => onView(booking)}
                className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
              >
                View Details
              </button>
              <button
                onClick={() =>
                  alert(`Place bid for booking #${booking.id}`)
                }
                className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
              >
                Place Bid
              </button>
            </>
          )}

          {status === "ACCEPTED" && (
             <><button
              onClick={() => onView(booking)}
              className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
            >
              View Details
            </button><button
              onClick={handleAssignClick}
              className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
            >
                Assign Shipment
              </button></>

          )}
          {status === "AWAITING_PAYMENT" && (
             <button
              onClick={() => onView(booking)}
              className="w-full py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
            >
              View Details
            </button>

          )}

          {status === "CONFIRMED" && (
             <><button
              onClick={() => onView(booking)}
              className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
            >
              View Details
            </button><button
              onClick={() => alert(`Tracking booking #${booking.id}`)}
              className="flex-1 py-2 bg-gradient-to-r from-[#4D2294] via-[#682EC7] to-[#39196E] rounded-md text-gray-600 dark:text-gray-200 font-semibold hover:opacity-90"
            >
                Track Shipment
              </button></>
          )}
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <AssignDriverModal bookingId={booking.id} onClose={handleCloseModal} />
      )}
    </>
  );
}
