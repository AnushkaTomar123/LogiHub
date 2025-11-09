import React, { useState } from "react";
import AssignDriverModal from "./AssignDriverModal";

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

  const handleAssignClick = () => {
    setShowAssignModal(true);
  };

  const handleCloseModal = () => {
    setShowAssignModal(false);
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-card shadow-md rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {booking.goodsDescription}
        </h2>

        <p>
          <span className="font-semibold">Pickup:</span> {booking.pickupAddress}
        </p>
        <p>
          <span className="font-semibold">Drop:</span> {booking.dropAddress}
        </p>
        <p>
          <span className="font-semibold">Vehicle:</span> {booking.vehicleType}
        </p>
        <p>
          <span className="font-semibold">Cost:</span> ₹{booking.estimatedCost}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {status}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {/* Always visible View button */}
          <button
            onClick={() => onView(booking)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            View
          </button>

          {/* ✅ Buttons based on status */}
          {status === "PENDING" && (
            <>
              <button
                onClick={() => onAccept(booking.id)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Accept Load
              </button>
              <button
                onClick={() =>
                  alert(`Place bid for booking #${booking.id}`)
                }
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
              >
                Place Bid
              </button>
            </>
          )}

          {status === "ACCEPTED" && (
            <button
              onClick={handleAssignClick}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
            >
              Assign Shipment
            </button>
          )}

          {status === "CONFIRMED" && (
            <button
              onClick={() => alert(`Tracking booking #${booking.id}`)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
              Track
            </button>
          )}
        </div>
      </div>

      {/* ✅ Modal appears when Assign Shipment clicked */}
      {showAssignModal && (
        <AssignDriverModal
          bookingId={booking.id}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
